// !rename to startDateTime
const TimeSlotEvent = (calendarEvent, timeSlotElement) => {
  const { stage, title } = calendarEvent || {};
  const classNameByEventStage = {
    upcoming: "time-slot-event-upcoming",
    ongoing: "time-slot-event-ongoing",
    past: "time-slot-event-past",
    draft: "time-slot-event-draft",
  }[stage];

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

/*
const eventElement = document.createElement("div");
eventElement.classList.add("time-slot-event");
eventElement.appendChild(document.createTextNode(eventThumbnailPlaceHolder));

timeSlotElement.appendChild(eventElement);
return eventElement;
*/
