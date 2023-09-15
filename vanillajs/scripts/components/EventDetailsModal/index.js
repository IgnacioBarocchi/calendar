import { render } from "../../helpers/modalHelper.js";

const EventDetailsModal = (calendarEvent, position) => {
  document.querySelector("#event-details-title").textContent =
    calendarEvent.title;
  document.querySelector("#event-details-description").textContent =
    calendarEvent.description;
  render(position, document.querySelector("#event-details-modal"));
};

export default EventDetailsModal;
