import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ErrorType } from "src/errors/types";
import {
  SEARCH_MEALS_DEFAULT_PAGE,
  SEARCH_MEALS_DEFAULT_LIMIT,
} from "src/constants/constants";
import { MealsOFFService } from "./mealsOff.service";
import { MealsService } from "./meals.service";
import { Meal, NewMeal, SearchMealsResponse } from "./types";
import { CreateCustomMealDto } from "../controllers/dto/createCustomMeal.dto";

@Injectable()
export class MealsApiService {
  constructor(
    private mealsService: MealsService,
    private mealsOFFService: MealsOFFService,
  ) {}

  async getMealByBarcode(barcode: string): Promise<Meal> {
    if (barcode.length !== 8 && barcode.length !== 13) {
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
  }

  async searchMeals(
    query: string,
    page?: number,
    limit?: number,
    userId?: string,
  ): Promise<SearchMealsResponse> {
    const pageNumber = page && page > 0 ? page : SEARCH_MEALS_DEFAULT_PAGE;
    const limitNumber = limit && limit > 0 ? limit : SEARCH_MEALS_DEFAULT_LIMIT;
    return this.mealsService.searchMeals(
      query,
      pageNumber,
      limitNumber,
      userId,
    );
  }

  async createCustomMeal(
    createCustomMealDto: CreateCustomMealDto,
    userId: string,
  ): Promise<Meal> {
    if (createCustomMealDto.barcode) {
      if (
        createCustomMealDto.barcode.length !== 8 &&
        createCustomMealDto.barcode.length !== 13
      ) {
        throw new BadRequestException(ErrorType.INVALID_BARCODE);
      }

      const existingMeal = await this.mealsService.getMealByBarcode(
        createCustomMealDto.barcode,
      );

      if (existingMeal) {
        throw new ConflictException(ErrorType.BARCODE_ALREADY_EXISTS);
      }

      const mealFromOFF = await this.mealsOFFService.getMealFromApi(
        createCustomMealDto.barcode,
      );

      if (mealFromOFF) {
        throw new ConflictException(ErrorType.BARCODE_ALREADY_EXISTS);
      }
    }

    const newMeal: NewMeal = {
      barcode: createCustomMealDto.barcode ?? null,
      name: createCustomMealDto.name,
      brand: createCustomMealDto.brand ?? null,
      energyKcalPer100g: createCustomMealDto.energyKcalPer100g,
      proteinPer100g: createCustomMealDto.proteinPer100g,
      fatPer100g: createCustomMealDto.fatPer100g,
      carbohydratesPer100g: createCustomMealDto.carbohydratesPer100g,
      saturatedFatPer100g: createCustomMealDto.saturatedFatPer100g ?? null,
      sugarsPer100g: createCustomMealDto.sugarsPer100g ?? null,
      fiberPer100g: createCustomMealDto.fiberPer100g ?? null,
      saltPer100g: createCustomMealDto.saltPer100g ?? null,
      sodiumPer100g: createCustomMealDto.sodiumPer100g ?? null,
      imageUrl: null,
      addedBy: userId,
    };

    return this.mealsService.createMeal(newMeal);
  }
}
