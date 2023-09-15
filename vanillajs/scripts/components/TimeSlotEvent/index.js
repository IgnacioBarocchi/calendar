import EventDetailsModal from "../EventDetailsModal/index.js";
import appendElements from "../../lib/appendElements.js";
import { createElement2 } from "../../lib/createElement.js";

const getEventHoursLong = (startDateTime, endDateTime) =>
  Math.abs(startDateTime - endDateTime) / 36e5;

const processEvents = (calendarEventElement, stage) => {
  if (stage === "draft") {
    calendarEventElement.classList.add("draft");
    return calendarEventElement;
  }

  calendarEventElement.addEventListener("click", function (clientEvent) {
    clientEvent.stopPropagation();
    const calendarEvent = JSON.parse(this.dataset.calendarEvent);
    console.log(calendarEvent);

    document.querySelector("#event-details-modal").showModal();
    EventDetailsModal(calendarEvent, [
      clientEvent.clientX,
      clientEvent.clientY,
    ]);
  });

  return calendarEventElement;
};

const TimeSlotEvent = (calendarEvent, timeSlot) => {
  const {
    stage,
    title,
    startDateTime: startDateTimeString,
    endDateTime: endDateTimeString,
    description,
  } = calendarEvent || {};

  const classNameByEventStage = {
    upcoming: "time-slot-event-upcoming",
    ongoing: "time-slot-event-ongoing",
    past: "time-slot-event-past",
    draft: "time-slot-event-draft",
  }[stage];

  const startDateTime = new Date(startDateTimeString);
  const endDateTime = new Date(endDateTimeString);
  const eventHoursLong = getEventHoursLong(startDateTime, endDateTime);

  if (!timeSlot) {
    timeSlot = document.querySelector(
      `[data-slot-index="${startDateTime.getDay()}-${startDateTime.getHours()}"]`
    );
  }

  const pixelUnitsOfOneHourSlot = timeSlot.offsetHeight;
  const calendarEventOffsetHeight = `${
    pixelUnitsOfOneHourSlot * eventHoursLong
  }`;

  const calendarEventElement = createElement2(
    `
      <div class="${classNameByEventStage}" style="height: ${calendarEventOffsetHeight}px; top:${startDateTime.getMinutes()}px" data-calendar-event='${JSON.stringify(
      calendarEvent
    )}'>
          <h3>${title}</h3>
          <div>${startDateTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })} - ${endDateTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}</div>
    ${description ? `<div>${description}</div>` : ""}
      </div>
    `
  );

  appendElements([processEvents(calendarEventElement, stage)], timeSlot);

  return calendarEventElement;
};

export default TimeSlotEvent;
