const getMonthDaysByMonth = (year) => {
  const monthDaysByMonth = new Map(
    [...Array(13).keys()].slice(1).map((month) => {
      const nextMonth = month === 12 ? 1 : month + 1;
      return [nextMonth, new Date(year, nextMonth, 0).getDate()];
    })
  );

  return monthDaysByMonth;
};

const getWeekMap = (selectedDate) => {
  const day = selectedDate.getDay();
  const date = selectedDate.getDate();

  const weekMap = new Map();
  weekMap.set(day, date);

  for (let i = 0; i < 6; i++) {
    if (day === i) {
      weekMap.set(day, date);
      weekMap.set(day + 1, date + 1);
    }

    if (day < i) {
      weekMap.set(day + i, date + i);
    } else {
      weekMap.set(day - i, date - i);
    }
  }

  return weekMap;
};

// const month = selectedDate.getMonth();
// const monthDaysByMonth = getMonthDaysByMonth(day.getFullYear());
