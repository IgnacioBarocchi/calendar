const getWeekDateByDayMap = (selectedDate /*: Date*/) => {
  const weekMap = new Map /*<string, string>*/();
  let dateResult = selectedDate;

  for (let i = selectedDate.getDay(); i < 6; i++) {
    const nextDate = dateResult.getDate() + 1;
    dateResult = new Date(dateResult.setDate(nextDate));
    weekMap.set(
      dateResult.getDay().toString(),
      dateResult.getDate().toString()
    );
  }

  dateResult = selectedDate;
  for (let i = selectedDate.getDay(); i > 0; i--) {
    const prevDate = dateResult.getDate() - 1;
    dateResult = new Date(dateResult.setDate(prevDate));
    weekMap.set(
      dateResult.getDay().toString(),
      dateResult.getDate().toString()
    );
  }

  return weekMap;
};

const getSundayOfWeek = (date) => {
  return new Date(date.setDate(date.getDate() - date.getDay()));
};

const getWeekFrom = (selectedDate) => {
  const Storage = localStorageService();
  const weekIndex = sessionStorageService().getWeekIndex();

  if (Storage.getWeekDatesByWeekIndex(weekIndex)) {
    return Storage.getWeekDatesByWeekIndex(weekIndex);
  }

  const startDate = getSundayOfWeek(selectedDate);

  const weekDates = [...Array(7).keys()].map((dayNumber) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayNumber);
    return currentDate;
  });

  Storage.saveWeekDates(weekDates);
  return weekDates;
};
