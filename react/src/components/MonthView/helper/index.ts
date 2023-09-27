import { Week } from '../../../lib/weekHelper';

const getDatesFromPreviousMonth = (date: Date): Date[] => {
  const dates: Date[] = [];

  const firstDayOfMonth = date.getDay();

  if (firstDayOfMonth === 0) return [];

  const referenceDate = new Date(date);

  [...Array(firstDayOfMonth).keys()].forEach(() => {
    referenceDate.setDate(referenceDate.getDate() - 1);
    dates.unshift(new Date(referenceDate));
  });

  return dates;
};

export const getMonthDatesOfYear = (week: Week): Date[] => {
  const referenceSunday = week[0];
  const year = referenceSunday.getFullYear();

  const stratDate = referenceSunday;
  const month = stratDate.getMonth();

  const date = new Date(year, month, 1);
  const dates = getDatesFromPreviousMonth(date);

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};
