import { localStorageService, sessionStorageService } from "./storage/index.js";

import Calendar2 from "./components/Calendar2/Calendar2.js";
import { getWeekFrom } from "./helpers/calendarHelper.js";

const Session = sessionStorageService();
const calendar = Calendar2();
calendar.instanceCalendar();
calendar.updateCalendar(getWeekFrom(new Date()));

const getDateOf = (requestedWeekView) => {
  const index = Session.getWeekIndex();
  const numberOfDaysToAdd = { current: 0, next: 7, prev: -7 }[
    requestedWeekView
  ];

  const today = new Date();
  if (numberOfDaysToAdd === 0) return today;

  const result = today.setDate(today.getDate() + numberOfDaysToAdd * index);

  return new Date(result);
};

["prev", "next", "ongoing"].forEach((requestedWeekView) => {
  document
    .querySelector(`#${requestedWeekView}-week`)
    .addEventListener("click", function () {
      Session.setWeekIndex(
        Session.getWeekIndex() +
          { prev: -1, next: 1, ongoing: 0 }[requestedWeekView]
      );

      calendar.updateCalendar(getWeekFrom(getDateOf(requestedWeekView)));
    });
});

// console.log(localStorageService().getEventsBySlotIndex());
// localStorageService().addEvent({
//   title: "test2",
//   description: "test2",
//   startDateTime: new Date(),
// });
