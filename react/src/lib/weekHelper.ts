import { RootState } from '../store/@types';

export type Week = RootState['week'];

export const getWeekFrom = (date: Date): Week => {
  const referenceSunday = new Date(
    date.setDate(date.getDate() - date.getDay()),
  );

  return [...Array(7).keys()].map((dayNumber: number) => {
    const currentDate = new Date(referenceSunday);
    currentDate.setDate(referenceSunday.getDate() + dayNumber);
    return currentDate;
  }) as Week;
};

export const calculateNextWeek = (currentWeek: Week): Week => {
  const lastDayOfCurrentWeek = new Date(currentWeek[6]);
  lastDayOfCurrentWeek.setDate(lastDayOfCurrentWeek.getDate() + 1);
  return getWeekFrom(lastDayOfCurrentWeek);
};

export const calculatePreviousWeek = (currentWeek: Week): Week => {
  const firstDayOfCurrentWeek = new Date(currentWeek[0]);
  firstDayOfCurrentWeek.setDate(firstDayOfCurrentWeek.getDate() - 1);
  return getWeekFrom(firstDayOfCurrentWeek);
};

export const indexOfDateInWeek = (date: Date, week: Week): number => {
  const index = week.findIndex((day) => day.getTime() === date.getTime());
  return index !== -1 ? index : -1;
};
