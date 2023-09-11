const getNumberOfDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => new Date(year, month).getDay();

const getStartDateOfWeek = (weekNumber, year, month) => {
  // e.g "Friday" "September" 1st
  const startDateOfMonth = new Date(year, month, 1);
  const daysToAdd = (weekNumber - 1) * 7;
  const startDateOfWeek = new Date(
    startDateOfMonth.setDate(startDateOfMonth.getDate() + daysToAdd)
  );
  return startDateOfWeek;
};

const getWeekNumber = (year, month) => {
  //   const today = new Date(year, 0, 1);
  const targetDay = new Date(year, month, 1);
  const startDateOfYear = new Date(year, 0, 1);
  //? https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
  const days = Math.floor(
    (targetDay - startDateOfYear) / (24 * 60 * 60 * 1000)
  );

  return Math.ceil(days / 7);
};

const ONGOING_WEEK_NUMBER = (() => {
  const today = new Date();
  return getWeekNumber(today.getFullYear(), today.getMonth());
})();

const createWeekMap = (weekNumber, year, month) => {
  if (!weekNumber) weekNumber = ONGOING_WEEK_NUMBER;
  if (!year) year = new Date().getFullYear();
  if (!month) month = new Date().getMonth() + 1;

  const startDate = getStartDateOfWeek(weekNumber, year, month);

  const weekMap = new Map();
  //7
  for (let i = 0; i < 7; i++) {
    const dayOfWeek = startDate.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const dayOfMonth = startDate.getDate();
    weekMap.set(dayOfWeek, dayOfMonth);
    startDate.setDate(startDate.getDate() + 1);
  }

  return weekMap;
};

const saveWeekData = (weekNumber, year, month, result) => {
  const key = `${weekNumber}-${year}-${month}`;
  //   memoize this data in local storage
  record = { [key]: result };
};

createWeekMap();
