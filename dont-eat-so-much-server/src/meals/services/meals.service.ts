import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { type DrizzleDatabase } from 'src/drizzle/types';
import { eq, desc, inArray } from 'drizzle-orm';
import * as schema from 'src/drizzle/schema';
import { DateTime } from 'luxon';
import { REFRESH_PRODUCTS_WITH_BARCODE_DAYS } from 'src/constants/constants';
import { Meal, mealReturn, NewMeal, RawMeal } from './types';

@Injectable()
export class MealsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDatabase) {}

  async createMeal(newMeal: NewMeal): Promise<Meal> {
    const [meal] = await this.db
      .insert(schema.meals)
      .values(newMeal)
      .returning(mealReturn);

    return meal;
  }

  async replaceMeal(mealId: string, meal: NewMeal): Promise<Meal> {
    const [updatedMeal] = await this.db
      .update(schema.meals)
      .set(meal)
      .where(eq(schema.meals.mealId, mealId))
      .returning(mealReturn);

    return updatedMeal;
  }

  async getMealsByIds(mealIds: string[]): Promise<Meal[]> {
    return this.db
      .select(mealReturn)
      .from(schema.meals)
      .where(inArray(schema.meals.mealId, mealIds));
  }

  async getMealByBarcode(barcode: string): Promise<RawMeal | null> {
    const [meal] = await this.db
      .select()
      .from(schema.meals)
      .where(eq(schema.meals.barcode, barcode))
      .limit(1);

    return meal ?? null;
  }

  async getLatestByUser(userId: string, page: number): Promise<Meal[]> {
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    return this.db
      .select(mealReturn)
      .from(schema.meals)
      .where(eq(schema.meals.addedBy, userId))
      .orderBy(desc(schema.meals.createdAt))
      .limit(pageSize)
      .offset(offset);
  }

  shouldMealBeRefreshed(
    meal: RawMeal,
    refreshDays: number = REFRESH_PRODUCTS_WITH_BARCODE_DAYS,
  ) {
    const now = DateTime.now();
    const createdAt = DateTime.fromJSDate(meal.createdAt);
    const diffInDays = now.diff(createdAt, 'days').days;
    return diffInDays >= refreshDays;
  }

  mapRawMealToMeal({
    addedBy: _addedBy,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...rest
  }: RawMeal): Meal {
    return rest;
  }
}
