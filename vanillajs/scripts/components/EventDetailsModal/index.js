import { localStorageService } from "../../storage/index.js";
import { render } from "../../helpers/modalHelper.js";
const Storage = localStorageService();

const EventDetailsModal = (calendarEvent, position) => {
  document.querySelector("#event-details-title").textContent =
    calendarEvent.title;
  document.querySelector("#event-details-description").textContent =
    calendarEvent.description;
  const modal = document.querySelector("#event-details-modal");
  render(position, modal);
  // calendarEvent
  document
    .querySelector("#delete-event-button")
    .addEventListener("click", function () {
      // this.remove();
      Storage.deleteEvent(calendarEvent);
    });
};

export default EventDetailsModal;
