import Calendar from "./components/Calendar/Calendar.js";
import CalendarBody from "./components/CalendarBody/CalendarBody.js";
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
const hd = new Header2(st);
const cb = new CalendarBody(st);
window.addEventListener("DOMContentLoaded", () => {
  hd.render();
  cb.render();
});
// window.addEventListener("DOMContentLoaded", () => {

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
