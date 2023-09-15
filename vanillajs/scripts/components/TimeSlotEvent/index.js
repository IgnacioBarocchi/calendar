import EventDetailsModal from "../EventDetailsModal/index.js";
import appendElements from "../../lib/appendElements.js";
import { createElement2 } from "../../lib/createElement.js";

const getEventHoursLong = (startDateTime, endDateTime) =>
  Math.abs(new Date(startDateTime) - new Date(endDateTime)) / 36e5;

const TimeSlotEvent = (calendarEvent, timeSlot) => {
  // const pixelUnitsOfOneHourSlot = timeSlot.offsetHeight;
  const { stage, title } = calendarEvent || {};
  const classNameByEventStage = {
    upcoming: "time-slot-event-upcoming",
    ongoing: "time-slot-event-ongoing",
    past: "time-slot-event-past",
    draft: "time-slot-event-draft",
  }[stage];
  const eventHoursLong = getEventHoursLong(
    calendarEvent.startDateTime,
    calendarEvent.endDateTime
  );

  if (!timeSlot) {
    timeSlot = document.querySelector(
      `[data-slot-index="${calendarEvent.startDateTime.getDay()}-${calendarEvent.startDateTime.getHours()}"]`
    );
  }

  const pixelUnitsOfOneHourSlot = timeSlot.offsetHeight;
  const calendarEventOffsetHeight = `${
    pixelUnitsOfOneHourSlot * eventHoursLong
  }`;

  const calendarEventElement = createElement2(
    `
      <div class="${classNameByEventStage}" style="height: ${calendarEventOffsetHeight}px;" data-calendar-event='${JSON.stringify(
      calendarEvent
    )}'>
          <span>${title}</span>
      </div>
    `
  );

  calendarEventElement.addEventListener("click", function (clientEvent) {
    clientEvent.stopPropagation();
    const calendarEvent = JSON.parse(this.dataset.calendarEvent);
    console.log(calendarEvent);

    EventDetailsModal(calendarEvent);
    document.querySelector("#event-details-modal").open = true;
  });
  appendElements([calendarEventElement], timeSlot);
};

export default TimeSlotEvent;
