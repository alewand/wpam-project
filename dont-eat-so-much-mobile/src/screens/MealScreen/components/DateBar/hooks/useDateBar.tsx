import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { styles } from "../DateBar.styles";
import {
  selectCurrentDay,
  selectSelectedDay,
  selectSelectedMonth,
  selectSelectedWeek,
  selectSelectedYear,
} from "../../../../../store/date/selectors";
import { Day } from "../../../../../store/date/types";
import { setNextWeek, setPreviousWeek, setSelectedDay } from "../../../../../store/date/slice";
import { getCurrentDay } from "../../../../../store/date/helpers";

export const useDateBar = () => {
  const dispatch = useAppDispatch();

  const selectedDay = useAppSelector(selectSelectedDay);
  const currentDay = useAppSelector(selectCurrentDay);
  const selectedWeek: Day[] = useAppSelector(selectSelectedWeek);
  const selectedMonth = useAppSelector(selectSelectedMonth);
  const selectedYear = useAppSelector(selectSelectedYear);

  const getDayStyle = useCallback(
    (date: DateTime) => {
      const basicStyle = [styles.dayCircle];
      if (date.hasSame(selectedDay, "day")) return [...basicStyle, styles.dayCircleSelected];
      if (date.hasSame(currentDay, "day")) return [...basicStyle, styles.dayCircleCurrent];
      return basicStyle;
    },
    [selectedDay, currentDay]
  );

  const getDayLabelStyle = useCallback(
    (date: DateTime) => {
      const basicStyle = { name: [styles.dayNameLabel], number: [styles.dayNumberLabel] };
      if (date.hasSame(selectedDay, "day") || date.hasSame(currentDay, "day")) {
        return {
          name: [...basicStyle.name, styles.dayNameLabelSelected],
          number: [...basicStyle.number, styles.dayNameNumberSelected],
        };
      }
      return basicStyle;
    },
    [selectedDay, currentDay]
  );

  const handlePreviousWeek = useCallback(() => {
    dispatch(setPreviousWeek());
  }, [dispatch]);

  const handleNextWeek = useCallback(() => {
    dispatch(setNextWeek());
  }, [dispatch]);

  const handleDayPress = useCallback(
    (date: DateTime) => {
      dispatch(setSelectedDay(date.toISO() ?? getCurrentDay()));
    },
    [dispatch]
  );

  const handleGoBackToSelectedDay = useCallback(() => {
    dispatch(setSelectedDay(getCurrentDay()));
  }, [dispatch]);

  const isGoBackDisabled = useMemo(() => {
    return selectedWeek.some((day) => day.date.hasSame(currentDay, "day"));
  }, [currentDay, selectedWeek]);

  useEffect(() => {
    handleGoBackToSelectedDay();
  }, [handleGoBackToSelectedDay]);

  return {
    selectedDay,
    selectedWeek,
    selectedMonth,
    selectedYear,
    getDayStyle,
    getDayLabelStyle,
    handlePreviousWeek,
    handleNextWeek,
    handleDayPress,
    handleGoBackToSelectedDay,
    isGoBackDisabled,
  };
};
