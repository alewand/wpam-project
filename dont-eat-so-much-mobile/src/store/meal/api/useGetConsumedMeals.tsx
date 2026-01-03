import { selectSelectedDay } from "../../date/selectors";
import { useAppSelector } from "../../store";
import { useGetConsumedMealsQuery } from "../api";
import type { ConsumedMeal } from "../types";

export const useGetConsumedMeals = () => {
  const selectedDay = useAppSelector(selectSelectedDay);
  const consumedAt = selectedDay.toISODate() ?? "";
  const {
    data: consumedMeals = [],
    isLoading,
    error,
  } = useGetConsumedMealsQuery(consumedAt, {
    skip: !consumedAt,
  });

  return {
    consumedMeals: consumedMeals as ConsumedMeal[],
    isLoading,
    error,
  };
};
