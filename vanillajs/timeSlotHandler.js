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

const createEvent = (timeSlotElement, dateTimeData) => {
  const modal = document.querySelector("#event-modal");
  // ! add event commitment logic.
  if (modal.open) return;
  const eventElement = document.createElement("div");
  eventElement.classList.add("time-slot-event");
  eventElement.appendChild(
    document.createTextNode(timeSlotElement.dataset.dayTime)
  );
  timeSlotElement.appendChild(eventElement);
};

const deleteEvent = () => {};
document.querySelectorAll("[data-day-time]").forEach((element) => {
  element.addEventListener("click", function (event) {
    const timeSlotData = this.dataset.dayTime;
    const { clientY, clientX } = event;
    styleModal(clientY, clientX);
    createEvent(this, timeSlotData);
  });
});
