import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { type DrizzleDatabase } from "src/drizzle/types";
import { CreateConsumedMealDto } from "../controllers/dto/createConsumedMeal.dto";
import { MealsService } from "src/meals/services/meals.service";
import { ErrorType } from "src/errors/types";
import * as schema from "src/drizzle/schema";
import {
  ConsumedMeal,
  consumedMealReturn,
  NewConsumedMeal,
  ConsumedMealWithMeal,
} from "./types";
import { DateTime } from "luxon";
import { and, desc, eq } from "drizzle-orm";
import { EditConsumedMealDto } from "../controllers/dto/editConsumedMeal.dto";
import { DRIZZLE } from "src/drizzle/drizzle.module";

@Injectable()
export class ConsumedMealsService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDatabase,
    private mealsService: MealsService,
  ) {}

  async createConsumedMeal(
    { mealId, amountInGrams, consumedAt }: CreateConsumedMealDto,
    userId: string,
  ): Promise<void> {
    const meal = await this.mealsService.getMealById(mealId);

    if (!meal) {
      throw new NotFoundException(ErrorType.MEAL_NOT_FOUND);
    }

    const validatedConsumptionDate = DateTime.fromISO(consumedAt);

    if (!validatedConsumptionDate.isValid) {
      throw new BadRequestException(ErrorType.INVALID_DATE_FORMAT);
    }

    const consumedMeal: NewConsumedMeal = {
      mealId,
      amountInGrams: amountInGrams.toFixed(2),
      consumedBy: userId,
      consumedAt: validatedConsumptionDate.toISODate(),
    };

    await this.db.insert(schema.consumedMeals).values(consumedMeal);
  }

  async editConsumedMeal(
    consumedMealId: string,
    { mealId, amountInGrams }: EditConsumedMealDto,
    userId: string,
  ): Promise<void> {
    const meal = await this.mealsService.getMealById(mealId);

    if (!meal) {
      throw new NotFoundException(ErrorType.MEAL_NOT_FOUND);
    }

    const [updatedConsumedMealId] = await this.db
      .update(schema.consumedMeals)
      .set({
        mealId,
        amountInGrams: amountInGrams.toFixed(2),
      })
      .where(
        and(
          eq(schema.consumedMeals.consumedMealId, consumedMealId),
          eq(schema.consumedMeals.consumedBy, userId),
        ),
      )
      .returning();

    if (!updatedConsumedMealId) {
      throw new NotFoundException(ErrorType.MEAL_NOT_FOUND);
    }
  }

  async deleteConsumedMeal(
    consumedMealId: string,
    userId: string,
  ): Promise<void> {
    const [deletedConsumedMeal] = await this.db
      .delete(schema.consumedMeals)
      .where(
        and(
          eq(schema.consumedMeals.consumedMealId, consumedMealId),
          eq(schema.consumedMeals.consumedBy, userId),
        ),
      )
      .returning();

    if (!deletedConsumedMeal) {
      throw new NotFoundException(ErrorType.MEAL_NOT_FOUND);
    }
  }

  async getConsumedMealsByUserIdAndDate(
    userId: string,
    date: string,
  ): Promise<ConsumedMealWithMeal[]> {
    const validatedDate = DateTime.fromISO(date);

    if (!validatedDate.isValid) {
      throw new BadRequestException(ErrorType.INVALID_DATE_FORMAT);
    }

    const whereCondition = and(
      eq(schema.consumedMeals.consumedBy, userId),
      eq(schema.consumedMeals.consumedAt, date),
    );

    const consumedMeals: ConsumedMeal[] = await this.db
      .select(consumedMealReturn)
      .from(schema.consumedMeals)
      .where(whereCondition)
      .orderBy(desc(schema.consumedMeals.createdAt));

    const mealsIds = consumedMeals.map((consumedMeal) => consumedMeal.mealId);

    const meals = await this.mealsService.getMealsByIds(mealsIds);
    const mealsMap = new Map(meals.map((meal) => [meal.mealId, meal]));

    const consumedMealsWithMeals = consumedMeals.map((consumedMeal) => ({
      ...consumedMeal,
      meal: mealsMap.get(consumedMeal.mealId)!,
    }));

    return consumedMealsWithMeals;
  }
}
