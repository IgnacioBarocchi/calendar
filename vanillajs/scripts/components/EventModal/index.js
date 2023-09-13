// !rename to startDateTime
const autoFillDates = (startTime, endTime) => {
  debugger;
  const startDateTimeField = document.querySelector("#start-datetime");
  const endDateTimeField = document.querySelector("#end-datetime");

  startDateTimeField.value = formatDateToDateInputValue(startTime);
  endDateTimeField.value = formatDateToDateInputValue(endTime);
};

const EventModal = (dateTimeEvent, position) => {
  const [x, y] = position;

  autoFillDates(dateTimeEvent.startTime, dateTimeEvent.endTime);
  const dialog = document.querySelector("#event-modal");

  const modalCss = `
      position: absolute;
      top: ${y}px; 
      left: ${x}px;
    `;

  dialog.style.cssText = modalCss;
  dialog.open = !dialog.open;
};

// ! account dialog w
// ${`${
//     clientX + dialog.offsetWidth > window.innerWidth ? "right" : "left"
//   }:${clientX}px`}
