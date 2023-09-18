// import { localStorageService } from "../../storage/index.js";
// import { render } from "../../helpers/modalHelper.js";
// const Storage = localStorageService();

// const EventDetailsModal = (calendarEventElement, position) => {
//   const calendarEvent = JSON.parse(calendarEventElement.dataset.calendarEvent);
//   alert(calendarEvent);

//   document.querySelector("#event-details-title").textContent =
//     calendarEvent.title;
//   document.querySelector("#event-details-description").textContent =
//     calendarEvent.description;
//   const modal = document.querySelector("#event-details-modal");
//   render(position, modal);

//   document
//     .querySelector("#delete-event-button")
//     .addEventListener("click", function () {
//       Storage.deleteEventByObjectIds(calendarEvent.id);
//       calendarEventElement.remove();
//       modal.close();
//     });
// };

// export default EventDetailsModal;
