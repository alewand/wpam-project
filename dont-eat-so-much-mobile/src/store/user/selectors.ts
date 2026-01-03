import { RootState } from "../store";

export const selectDailyCaloriesLimit = (state: RootState) => state.userLimits.dailyCaloriesLimit;
export const selectDailyProteinLimit = (state: RootState) => state.userLimits.dailyProteinLimit;
export const selectDailyFatLimit = (state: RootState) => state.userLimits.dailyFatLimit;
export const selectDailyCarbohydratesLimit = (state: RootState) =>
  state.userLimits.dailyCarbohydratesLimit;

