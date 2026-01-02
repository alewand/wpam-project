import { createSlice } from "@reduxjs/toolkit/react";

import { getCurrentDay, getNextWeek, getPreviousWeek, getWeek } from "./helpers";

export interface DateState {
  selectedWeek: string[];
  selectedDay: string;
  currentDay: string;
}

const initialState: DateState = {
  selectedWeek: getWeek(),
  selectedDay: getCurrentDay(),
  currentDay: getCurrentDay(),
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDay(state, action: { payload: string }) {
      state.selectedDay = action.payload;
      state.selectedWeek = getWeek(action.payload);
    },
    setSelectedWeek(state, action: { payload?: string }) {
      state.selectedWeek = getWeek(action.payload ?? state.selectedDay);
    },
    setPreviousWeek(state) {
      state.selectedWeek = getPreviousWeek(state.selectedWeek);
    },
    setNextWeek(state) {
      state.selectedWeek = getNextWeek(state.selectedWeek);
    },
  },
});

export default dateSlice.reducer;
export const { setSelectedDay, setSelectedWeek, setPreviousWeek, setNextWeek } = dateSlice.actions;
