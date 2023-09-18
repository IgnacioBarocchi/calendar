import CalendarBody from "./components/CalendarBody/CalendarBody.js";
import CalendarHeaderRow from "./components/Header/HeaderElements/CalendarHeaderRow.js";
import NavigationControls from "./components/Header/HeaderElements/NavigationBar.js";
import SessionStorageService2 from "./storage/SessionStorageService2.js";

const st = new SessionStorageService2();
const hd = new CalendarHeaderRow(st);
const cb = new CalendarBody(st);

window.addEventListener("DOMContentLoaded", () => {
  hd.render();
  cb.render();

  const nv = new NavigationControls(st, hd, cb);
  nv.navigate();
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
