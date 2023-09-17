import Calendar from "./components/Calendar/Calendar.js";
// import ClockHand from "./components/ClockHand/ClockHand.js";
import CreateEventModal from "./components/CreateEventModal/index.js";
import Header from "./components/Header/index.js";
import Header2 from "./components/Header/Header.js";
import NavigationBar from "./components/Header/HeaderElements/NavigationBar.js";
import SessionStorageService2 from "./storage/SessionStorageService2.js";
import TimeSlotEvent from "./components/TimeSlotEvent/index.js";
import { getWeekFrom } from "./helpers/calendarHelper.js";
import { sessionStorageService } from "./storage/index.js";

const st = new SessionStorageService2();

// const vn = new NavigationBar(st);
const hd = new Header2(st);
// const cl = new Calendar2(st);
// cl.render();
hd.render();

// window.addEventListener("DOMContentLoaded", () => {
//   const Session = sessionStorageService();
//   const calendar = Calendar();
//   // const clockHand = ClockHand();
//   calendar.instanceCalendar();
//   calendar.updateCalendar(getWeekFrom(new Date()));

//   Header(new Date());

//   const getDateOf = (requestedWeekView) => {
//     const index = Session.getWeekIndex();
//     const numberOfDaysToAdd = { ongoing: 0, next: 7, prev: -7 }[
//       requestedWeekView
//     ];

//     const today = new Date();
//     if (numberOfDaysToAdd === 0) return today;

//     const result = today.setDate(today.getDate() + numberOfDaysToAdd * index);

//     return new Date(result);
//   };

//   ["prev", "next", "ongoing"].forEach((requestedWeekView) => {
//     document
//       .querySelector(`#${requestedWeekView}-week`)
//       .addEventListener("click", function () {
//         Session.setWeekIndex(
//           Session.getWeekIndex() +
//             { prev: -1, next: 1, ongoing: 0 }[requestedWeekView]
//         );

//         const requestedWeekViewDate = getDateOf(requestedWeekView);
//         calendar.updateCalendar(getWeekFrom(requestedWeekViewDate));
//         Header(requestedWeekViewDate);
//         // clockHand.render();
//       });
//   });

//   function createCalendarEventWithAsideButton(clientEvent) {
//     const draftEvent = {
//       stage: "draft",
//       title: `(no title), ${new Date().getHours()}`,
//       startDateTime: new Date(),
//       endDateTime: new Date(new Date().setMinutes(30)),
//     };
//     TimeSlotEvent(draftEvent).scrollIntoView({
//       // behavior: "smooth",
//       block: "end",
//       inline: "nearest",
//     });
//     CreateEventModal(draftEvent, [clientEvent.clientY, clientEvent.clientX]);
//   }

//   document
//     .querySelector("#aside-create-event-button")
//     .addEventListener("click", createCalendarEventWithAsideButton);
// });
