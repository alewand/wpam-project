import { Inject, Injectable } from "@nestjs/common";
import { DRIZZLE } from "src/drizzle/drizzle.module";
import { type DrizzleDatabase } from "src/drizzle/types";
import { eq, inArray, or, ilike, count, and } from "drizzle-orm";
import * as schema from "src/drizzle/schema";
import { DateTime } from "luxon";
import {
  REFRESH_PRODUCTS_WITH_BARCODE_DAYS,
  SEARCH_MEALS_DEFAULT_PAGE,
  SEARCH_MEALS_DEFAULT_LIMIT,
} from "src/constants/constants";
import {
  Meal,
  mealReturn,
  NewMeal,
  RawMeal,
  SearchMealsResponse,
} from "./types";

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

  async editMeal(mealId: string, meal: NewMeal): Promise<Meal | null> {
    const [updatedMeal] = await this.db
      .update(schema.meals)
      .set(meal)
      .where(eq(schema.meals.mealId, mealId))
      .returning(mealReturn);

    return updatedMeal ?? null;
  }

  async getMealById(mealId: string): Promise<Meal | null> {
    const [meal] = await this.db
      .select(mealReturn)
      .from(schema.meals)
      .where(eq(schema.meals.mealId, mealId))
      .limit(1);

    return meal ?? null;
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

  async searchMeals(
    query: string,
    page: number = SEARCH_MEALS_DEFAULT_PAGE,
    limit: number = SEARCH_MEALS_DEFAULT_LIMIT,
    userId?: string,
  ): Promise<SearchMealsResponse> {
    const trimmedQuery = query.trim();

    const searchCondition = trimmedQuery
      ? or(
          ilike(schema.meals.name, `%${trimmedQuery}%`),
          ilike(schema.meals.brand, `%${trimmedQuery}%`),
          eq(schema.meals.barcode, trimmedQuery),
        )
      : undefined;

    const userCondition = userId ? eq(schema.meals.addedBy, userId) : undefined;

    const whereCondition =
      searchCondition && userCondition
        ? and(searchCondition, userCondition)
        : searchCondition || userCondition;

    const countQuery = this.db.select({ count: count() }).from(schema.meals);

    if (whereCondition) {
      countQuery.where(whereCondition);
    }

    const [totalResult] = await countQuery;
    const total = totalResult?.count ?? 0;
    const totalPages = Math.ceil(total / limit);

    const validPage = Math.max(1, Math.min(page, totalPages || 1));
    const offset = (validPage - 1) * limit;

    const mealsQuery = this.db
      .select(mealReturn)
      .from(schema.meals)
      .limit(limit)
      .offset(offset);

    if (whereCondition) {
      mealsQuery.where(whereCondition);
    }

    const meals = await mealsQuery;

    return {
      meals,
      total,
      page: validPage,
      limit,
      totalPages,
    };
  }

  shouldMealBeRefreshed(
    meal: RawMeal,
    refreshDays: number = REFRESH_PRODUCTS_WITH_BARCODE_DAYS,
  ) {
    const now = DateTime.now();
    const createdAt = DateTime.fromJSDate(meal.createdAt);
    const diffInDays = now.diff(createdAt, "days").days;

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
