import { createSelector } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

import i18n from "../../utils/i18n";
import { RootState } from "../store";

const selectDateState = createSelector(
    (state: RootState) => state.date,
    (date) => date
);

export const selectSelectedWeek = createSelector(
    selectDateState,
    (dateState) => {
        return dateState.selectedWeek.map((dateIso) => {
            const date = DateTime.fromISO(dateIso).setLocale(i18n.language);
            return {
                name: date.toFormat('cccc').toUpperCase(),
                date,
            };
        });
    }
);

export const selectMonthOfSelectedWeek = createSelector(
    selectDateState,
    (dateState) => {
        const date = DateTime.fromISO(dateState.selectedWeek[0]).setLocale(i18n.language);
        return date.toFormat("LLLL").toUpperCase(); 
    }
);

export const selectYearOfSelectedWeek = createSelector(
    selectDateState,
    (dateState) => {
        const date = DateTime.fromISO(dateState.selectedWeek[0]);
        return date.year;
    }
);

export const selectSelectedDay = createSelector(
    selectDateState,
    (date) => DateTime.fromISO(date.selectedDay) ?? DateTime.local()
);

export const selectCurrentDay = createSelector(
    selectDateState,
    (date) => DateTime.fromISO(date.currentDay) ?? DateTime.local()
);