import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ErrorType } from "src/errors/types";
import { BARCODE_LENGTH } from "src/constants/constants";
import { MealsOFFService } from "./mealsOff.service";
import { MealsService } from "./meals.service";
import { Meal, NewMeal } from "./types";

@Injectable()
export class MealsApiService {
  constructor(
    private mealsService: MealsService,
    private mealsOFFService: MealsOFFService,
  ) {}

  async getMealByBarcode(barcode: string): Promise<Meal> {
    if (barcode.length !== BARCODE_LENGTH) {
      throw new BadRequestException(ErrorType.INVALID_BARCODE);
    }

    let shouldBeRefreshed = false;
    const mealFromDB = await this.mealsService.getMealByBarcode(barcode);

    if (mealFromDB) {
      if (!this.mealsService.shouldMealBeRefreshed(mealFromDB)) {
        return this.mealsService.mapRawMealToMeal(mealFromDB);
      }

      shouldBeRefreshed = true;
    }

    const mealFromApi = await this.mealsOFFService.getMealFromApi(barcode);

    if (!mealFromApi) {
      throw new NotFoundException(ErrorType.MEAL_NOT_FOUND);
    }

    const mappedMeal = this.mealsOFFService.mapMealOFFToMeal(mealFromApi);

    if (!mappedMeal) {
      throw new NotFoundException(ErrorType.MEAL_NOT_FOUND);
    }

    if (shouldBeRefreshed && mealFromDB) {
      const refreshedMeal = await this.mealsService.editMeal(
        mealFromDB.mealId,
        mappedMeal,
      );

      if (refreshedMeal) {
        return refreshedMeal;
      } else {
        throw new NotFoundException(ErrorType.MEAL_NOT_FOUND);
      }
    }

    return this.mealsService.createMeal(mappedMeal);
  };

  // async createMeal(meal: NewMeal, userId: string): Promise<Meal> {
  //   return this.mealsService.createMeal({ ...meal, addedBy: userId });
  // };

  // async getLatestMealsByUser(userId: string, page: number): Promise<Meal[]> {
  //   if (page < 1) {
  //     throw new NotFoundException(ErrorType.MEAL_NOT_FOUND);
  //   }

  //   const meals = await this.mealsService.getLatestByUser(userId, page);

  //   if (!meals.length) {
  //     throw new NotFoundException(ErrorType.MEAL_NOT_FOUND);
  //   }

  //   return meals;
  // };
}
