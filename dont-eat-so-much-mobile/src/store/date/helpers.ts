import { DateTime } from "luxon";


export const getWeek = (date: string = DateTime.local().toISO()): string[] => {
    const startOfWeek = DateTime.fromISO(date).startOf('week');
    const dates = Array.from({ length: 7 }, (_, i) =>
        startOfWeek.plus({ days: i }).toISO() ?? ""
    );
  return dates;
};

export const getPreviousWeek = (currentWeek: string[]): string[] => {
    if (currentWeek.length !== 7) return getWeek();
    const firstDayOfCurrentWeek = DateTime.fromISO(currentWeek[0]);
    if (!firstDayOfCurrentWeek.isValid) return getWeek();
    const firstDayOfPreviousWeek = firstDayOfCurrentWeek.minus({ days: 1 });
    return getWeek(firstDayOfPreviousWeek.toISO());
};

export const getNextWeek = (currentWeek: string[]): string[] => {
    if (currentWeek.length !== 7) return getWeek();
    const lastDayOfCurrentWeek = DateTime.fromISO(currentWeek[currentWeek.length - 1]);
    if (!lastDayOfCurrentWeek.isValid) return getWeek();
    const firstDayOfNextWeek = lastDayOfCurrentWeek.plus({ days: 1 });
    return getWeek(firstDayOfNextWeek.toISO());
};

export const getCurrentDay = (): string => {
    return DateTime.local().toISO();
};