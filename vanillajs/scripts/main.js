import CalendarBody from "./components/CalendarBody/CalendarBody.js";
import CalendarHeaderRow from "./components/CalendarHeaderRow/CalendarHeaderRow.js";
import NavigationControls from "./controls/NavigationControls.js";
import SessionStorageService2 from "./storage/Storage.js";
// import removeDraftEvents from "./lib/removeDraftEvents.js";

const st = new SessionStorageService2();
const hd = new CalendarHeaderRow(st);
const cb = new CalendarBody(st);

window.addEventListener("DOMContentLoaded", () => {
  hd.render();
  cb.render();

  const nv = new NavigationControls(st, hd, cb);
  nv.navigate();

  // document.body.addEventListener("keypress", function (e) {
  //   if (e.key == "Escape") removeDraftEvents();
  // });

  // document.querySelectorAll('.close-button')array.forEach(element => {

  // });.addEventListener();
});

/* 
window.addEventListener("DOMContentLoaded", () => {

  function createCalendarEventWithAsideButton(clientEvent) {
    const draftEvent = {
      stage: "draft",
      title: `(no title), ${new Date().getHours()}`,
      startDateTime: new Date(),
      endDateTime: new Date(new Date().setMinutes(30)),
    };
    TimeSlotEvent(draftEvent).scrollIntoView({
      // behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    CreateEventModal(draftEvent, [clientEvent.clientY, clientEvent.clientX]);
  }

  document
    .querySelector("#aside-create-event-button")
    .addEventListener("click", createCalendarEventWithAsideButton);
});
*/
