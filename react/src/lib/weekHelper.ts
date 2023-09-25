export const getWeekFrom = (date: Date): Date[] => {
  const referenceSunday = new Date(
    date.setDate(date.getDate() - date.getDay()),
  );

  return [...Array(7).keys()].map((dayNumber: number) => {
    const currentDate = new Date(referenceSunday);
    currentDate.setDate(referenceSunday.getDate() + dayNumber);
    return currentDate;
  });
};

export const calculateNextWeek = (currentWeek: Date[]): Date[] => {
  const lastDayOfCurrentWeek = new Date(currentWeek[6]);
  lastDayOfCurrentWeek.setDate(lastDayOfCurrentWeek.getDate() + 1);
  return getWeekFrom(lastDayOfCurrentWeek);
};

export const calculatePreviousWeek = (currentWeek: Date[]): Date[] => {
  const firstDayOfCurrentWeek = new Date(currentWeek[0]);
  firstDayOfCurrentWeek.setDate(firstDayOfCurrentWeek.getDate() - 1);
  return getWeekFrom(firstDayOfCurrentWeek);
};
