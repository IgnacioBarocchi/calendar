// !rename to startDateTime
import appendElements from "../../lib/appendElements.js";
import { createElement2 } from "../../lib/createElement.js";
const TimeSlotEvent = (calendarEvent, timeSlotElement) => {
  const { stage, title } = calendarEvent || {};
  const classNameByEventStage = {
    upcoming: "time-slot-event-upcoming",
    ongoing: "time-slot-event-ongoing",
    past: "time-slot-event-past",
    draft: "time-slot-event-draft",
  }[stage];

  if (!timeSlotElement) {
    // search for it
    return;
  }
  appendElements(
    [
      createElement2(
        `
          <div class="${classNameByEventStage}">
              <span>${title}</span>
          </div>
        `
      ),
    ],
    timeSlotElement
  );
};

export default TimeSlotEvent;
/*
const eventElement = document.createElement("div");
eventElement.classList.add("time-slot-event");
eventElement.appendChild(document.createTextNode(eventThumbnailPlaceHolder));

timeSlotElement.appendChild(eventElement);
return eventElement;
*/
