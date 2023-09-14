import { sessionStorageService } from "../storage/index.js";

const getSundayOfWeek = (date) => {
  return new Date(date.setDate(date.getDate() - date.getDay()));
};

const getWeekFrom = (selectedDate) => {
  const Session = sessionStorageService();
  const weekIndex = sessionStorageService().getWeekIndex();

  if (Session.getWeekDatesByWeekIndex(weekIndex)) {
    return Session.getWeekDatesByWeekIndex(weekIndex);
  }

  const startDate = getSundayOfWeek(selectedDate);

  const weekDates = [...Array(7).keys()].map((dayNumber) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayNumber);
    return currentDate;
  });

  Session.saveWeekDates(weekDates);
  return weekDates;
};

export { getWeekFrom, getSundayOfWeek };
