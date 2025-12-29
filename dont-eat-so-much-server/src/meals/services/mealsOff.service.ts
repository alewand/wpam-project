import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
  OFF_API,
  OFF_API_FIELDS_STRING,
  REQUIRED_NUTRIENTS,
} from "src/constants/constants";
import { firstValueFrom } from "rxjs";
import { MealOFF, MealOFFResponse, NewMeal } from "./types";

@Injectable()
export class MealsOFFService {
  constructor(private httpService: HttpService) {}

  async getMealFromApi(barcode: string): Promise<MealOFF | null> {
    const url = this.getMealRequestUrl(barcode);

    try {
      const response = await firstValueFrom(
        this.httpService.get<MealOFFResponse>(url),
      );

      if (
        !response.data ||
        response.data.status === 0 ||
        !response.data.product
      )
        return null;

      if (!this.doesRequiredNutrientsExist(response.data.product)) return null;

      return response.data.product;
    } catch {
      return null;
    }
  }

  mapMealOFFToMeal(mealFromApi: MealOFF): NewMeal | null {
    const { brands, nutriments } = mealFromApi;

    if (!nutriments) return null;

    return {
      barcode: mealFromApi.code,
      name: mealFromApi.product_name,
      brand: this.getBrandName(brands),
      energyKcalPer100g: nutriments["energy-kcal_100g"] ?? 0,
      proteinPer100g: nutriments.proteins_100g ?? 0,
      fatPer100g: nutriments.fat_100g ?? 0,
      carbohydratesPer100g: nutriments.carbohydrates_100g ?? 0,

      saturatedFatPer100g: nutriments["saturated-fat_100g"] ?? null,
      sugarsPer100g: nutriments.sugars_100g ?? null,
      fiberPer100g: nutriments.fiber_100g ?? null,
      saltPer100g: nutriments.salt_100g ?? null,
      sodiumPer100g: nutriments.sodium_100g ?? null,
    };
  }

  private doesRequiredNutrientsExist(meal: MealOFF): boolean {
    if (!meal.nutriments) return false;

    const { nutriments } = meal;

    return REQUIRED_NUTRIENTS.every(
      (nutrient) => nutriments[nutrient] !== undefined,
    );
  }

  private getBrandName(brands?: string | string[]): string | null {
    if (!brands) return null;
    if (Array.isArray(brands)) return brands[0] ?? null;
    return brands.split(",")[0].trim();
  }

  private getMealRequestUrl(barcode: string): string {
    return `${OFF_API}${barcode}?fields=${OFF_API_FIELDS_STRING}`;
  }
}
