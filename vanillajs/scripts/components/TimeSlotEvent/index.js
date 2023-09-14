// !rename to startDateTime
import appendElements from "../../lib/appendElements.js";
import { createElement2 } from "../../lib/createElement.js";
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
    timeSlot
  );
};

export default TimeSlotEvent;
