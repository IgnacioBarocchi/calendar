import Calendar2 from "./components/Calendar2/Calendar2.js";
import EventDetailsModal from "./components/EventDetailsModal/index.js";
import Header from "./components/Header/index.js";
import { getWeekFrom } from "./helpers/calendarHelper.js";
import { sessionStorageService } from "./storage/index.js";

const Session = sessionStorageService();
const calendar = Calendar2();
calendar.instanceCalendar();
calendar.updateCalendar(getWeekFrom(new Date()));
Header(new Date());
EventDetailsModal();

const getDateOf = (requestedWeekView) => {
  const index = Session.getWeekIndex();
  const numberOfDaysToAdd = { ongoing: 0, next: 7, prev: -7 }[
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

      const requestedWeekViewDate = getDateOf(requestedWeekView);
      calendar.updateCalendar(getWeekFrom(requestedWeekViewDate));
      Header(requestedWeekViewDate);
    });
});
