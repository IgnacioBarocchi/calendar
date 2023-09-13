const styleModal = (clientY, clientX) => {
  const modal = document.querySelector("#event-modal");
  modal.style.cssText = "";
  modal.open = !modal.open;
  const modalCss = `
      position:absolute;
      top:${clientY}px; 
      ${`${
        clientX + modal.offsetWidth > window.innerWidth ? "right" : "left"
      }:${clientX}px`}
    `;
  // ! account modal w
  modal.style.cssText = modalCss;
};

// !rename to startDateTime
const populateEventRecordOnSlotClick = (startTime, endTime) => {
  const startDateTimeField = document.querySelector("#start-datetime");
  const endDateTimeField = document.querySelector("#end-datetime");

  startDateTimeField.value = formatDateToDateInputValue(startTime);
  endDateTimeField.value = formatDateToDateInputValue(endTime);
};

const getDraftEventFrom = (timeSlotElement) => {
  const slotDateTime = new Date(timeSlotElement.dataset.dayTime);
  const startTime = new Date(timeSlotElement.dataset.dayTime);
  const endTime = new Date(slotDateTime.setMinutes(30));

  return {
    stage: "draft",
    title: `(no title), ${startTime.getHours()}`,
    startTime,
    endTime,
  };
};

const deleteEvent = () => {};

document.querySelectorAll("[data-day-time]").forEach((element) => {
  element.addEventListener("click", function (event) {
    const { clientY, clientX } = event;
    styleModal(clientY, clientX);
    const draftEvent = getDraftEventFrom(this);
    TimeSlotEvent(draftEvent, this);
    populateEventRecordOnSlotClick(draftEvent.startTime, draftEvent.endTime);
  });
});
