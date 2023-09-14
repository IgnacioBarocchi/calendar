// !rename to startDateTime
import appendElements from "../../lib/appendElements.js";
import { createElement2 } from "../../lib/createElement.js";
// ! no hace falta pasar el timeslot a calendar event.
const TimeSlotEvent = (calendarEvent, timeSlot) => {
  // const pixelUnitsOfOneHourSlot = timeSlot.offsetHeight;
  debugger;
  const { stage, title } = calendarEvent || {};
  const classNameByEventStage = {
    upcoming: "time-slot-event-upcoming",
    ongoing: "time-slot-event-ongoing",
    past: "time-slot-event-past",
    draft: "time-slot-event-draft",
  }[stage];

  if (!timeSlot) {
    // search for it
    return;
  }

  const calendarEventElement = createElement2(
    `
      <div class="${classNameByEventStage}">
          <span>${title}</span>
      </div>
    `
  );

  calendarEventElement.addEventListener("click", (e) => {
    e.stopPropagation();
    alert("show event details. pass client x and y");
    // const events = Storage.getEvents();
    // const eventId = Number(calendarEvent.parentElement.dataset.eventIds);
    // if (events[eventId]) {
    //   EventDetailsModal(events[eventId]);
    //   document.querySelector("#event-details-modal").open = true;
    // }
  });
  appendElements([calendarEventElement], timeSlot);
};

export default TimeSlotEvent;
