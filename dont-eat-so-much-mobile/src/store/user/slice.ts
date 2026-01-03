import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistReducer from "redux-persist/es/persistReducer";
import {
  DEFAULT_DAILY_CALORIES_LIMIT,
  DEFAULT_DAILY_PROTEIN_LIMIT,
  DEFAULT_DAILY_FAT_LIMIT,
  DEFAULT_DAILY_CARBOHYDRATES_LIMIT,
} from "../../constants/constants";

export interface UserLimitsState {
  dailyCaloriesLimit?: number;
  dailyProteinLimit?: number;
  dailyFatLimit?: number;
  dailyCarbohydratesLimit?: number;
}

const initialState: UserLimitsState = {
  dailyCaloriesLimit: DEFAULT_DAILY_CALORIES_LIMIT,
  dailyProteinLimit: DEFAULT_DAILY_PROTEIN_LIMIT,
  dailyFatLimit: DEFAULT_DAILY_FAT_LIMIT,
  dailyCarbohydratesLimit: DEFAULT_DAILY_CARBOHYDRATES_LIMIT,
};

export const userLimitsSlice = createSlice({
  name: "userLimits",
  initialState,
  reducers: {
    setDailyCaloriesLimit(state, action: PayloadAction<number | undefined>) {
      state.dailyCaloriesLimit = action.payload;
    },
    setDailyProteinLimit(state, action: PayloadAction<number | undefined>) {
      state.dailyProteinLimit = action.payload;
    },
    setDailyFatLimit(state, action: PayloadAction<number | undefined>) {
      state.dailyFatLimit = action.payload;
    },
    setDailyCarbohydratesLimit(state, action: PayloadAction<number | undefined>) {
      state.dailyCarbohydratesLimit = action.payload;
    },
    clearLimits() {
      return initialState;
    },
  },
});

const userLimitsPersistConfig = {
  key: "userLimits",
  storage: AsyncStorage,
};

const persistedUserLimitsReducer = persistReducer(userLimitsPersistConfig, userLimitsSlice.reducer);

export default persistedUserLimitsReducer;
export const {
  setDailyCaloriesLimit,
  setDailyProteinLimit,
  setDailyFatLimit,
  setDailyCarbohydratesLimit,
  clearLimits,
} = userLimitsSlice.actions;
