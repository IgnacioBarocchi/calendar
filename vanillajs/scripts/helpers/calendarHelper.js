import {
  localStorageService,
  sessionStorageService,
} from "../storage/index.js";

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

export { getWeekFrom, getSundayOfWeek };
