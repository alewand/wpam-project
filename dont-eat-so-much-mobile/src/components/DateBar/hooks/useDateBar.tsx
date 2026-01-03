import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { selectCurrentDay, selectSelectedDay } from "../../../store/date/selectors";
import { Day } from "../../../store/date/types";
import { styles } from "../DateBar.styles";
import { setNextWeek, setPreviousWeek, setSelectedDay } from "../../../store/date/slice";
import { getCurrentDay, isDayInWeek } from "../../../store/date/helpers";

export interface UseDateBarProps {
  resetDate?: boolean;
}

export const useDateBar = ({ resetDate }: UseDateBarProps) => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const selectedDay = useAppSelector(selectSelectedDay);
  const currentDay = useAppSelector(selectCurrentDay);
  const selectedWeekRaw = useAppSelector((state) => state.date.selectedWeek);
  const selectedDayRaw = useAppSelector((state) => state.date.selectedDay);

  const selectedWeek: Day[] = useMemo(() => {
    return selectedWeekRaw.map((dateIso) => {
      const date = DateTime.fromISO(dateIso).setLocale(i18n.language);
      return {
        name: date.toFormat("cccc").toUpperCase(),
        date,
      };
    });
  }, [selectedWeekRaw, i18n.language]);

  const selectedMonth = useMemo(() => {
    if (isDayInWeek(selectedDayRaw, selectedWeekRaw)) {
      const date = DateTime.fromISO(selectedDayRaw).setLocale(i18n.language);
      return date.toFormat("LLLL").toUpperCase();
    }
    const date = DateTime.fromISO(selectedWeekRaw[0]).setLocale(i18n.language);
    return date.toFormat("LLLL").toUpperCase();
  }, [selectedDayRaw, selectedWeekRaw, i18n.language]);

  const selectedYear = useMemo(() => {
    if (isDayInWeek(selectedDayRaw, selectedWeekRaw)) {
      const date = DateTime.fromISO(selectedDayRaw);
      return date.year;
    }
    const date = DateTime.fromISO(selectedWeekRaw[0]);
    return date.year;
  }, [selectedDayRaw, selectedWeekRaw]);

  const shouldDateBeReseted = useRef<boolean>(resetDate ?? false);

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

  const handleDayPress = useCallback(
    (date: DateTime) => {
      dispatch(setSelectedDay(date.toISO() ?? getCurrentDay()));
    },
    [dispatch]
  );

  const handlePreviousWeek = useCallback(() => {
    dispatch(setPreviousWeek());
  }, [dispatch]);

  const handleNextWeek = useCallback(() => {
    dispatch(setNextWeek());
  }, [dispatch]);

  const handleGoBackToSelectedDay = useCallback(() => {
    dispatch(setSelectedDay(getCurrentDay()));
  }, [dispatch]);

  const isGoBackDisabled = useMemo(() => {
    return selectedWeek.some((day) => day.date.hasSame(currentDay, "day"));
  }, [currentDay, selectedWeek]);

  useEffect(() => {
    if (shouldDateBeReseted.current) {
      handleGoBackToSelectedDay();
      shouldDateBeReseted.current = false;
    }
  }, [handleGoBackToSelectedDay, shouldDateBeReseted]);

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
