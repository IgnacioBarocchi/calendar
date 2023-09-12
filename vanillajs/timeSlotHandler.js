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

const populateEventRecordOnSlotClick = () => {
  // !clear first
  const startDate = document.querySelector("#start-datetime");
  // get date from params
  startDate.value = new Date();
};

const getDraftEvent = (timeSlotElement) => {
  const { time } = JSON.parse(timeSlotElement.dataset.dayTime);
  const eventThumbnailPlaceHolder = `(no title), ${time}`;

  const eventElement = document.createElement("div");
  eventElement.classList.add("time-slot-event");
  eventElement.appendChild(document.createTextNode(eventThumbnailPlaceHolder));

  timeSlotElement.appendChild(eventElement);
  return eventElement;
};

// ! add event commitment logic.
// ? draft > pending > approved
const createEvent = (timeSlotElement) => {
  // const modal = document.querySelector("#event-modal");
  // // if (modal.open) return;
  // const eventElement = document.createElement("div");
  // eventElement.classList.add("time-slot-event");
  // eventElement.appendChild(
  //   document.createTextNode(timeSlotElement.dataset.dayTime)
  // );
  // timeSlotElement.appendChild(eventElement);
};

const deleteEvent = () => {};
document.querySelectorAll("[data-day-time]").forEach((element) => {
  element.addEventListener("click", function (event) {
    const { clientY, clientX } = event;
    styleModal(clientY, clientX);
    const draftEvent = getDraftEvent(this);
    // populateEventRecordOnSlotClick
  });
});
