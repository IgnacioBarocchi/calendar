import EventDetailsModal from "../components/EventDetailsModal/index.js";
import { localStorageService } from "../storage/index.js";
const Storage = localStorageService();

document
  .querySelectorAll("[class^=time-slot-event]")
  .forEach((calendarEvent) => {
    calendarEvent.addEventListener("click", (clientEvent) => {
      clientEvent.stopPropagation();
      debugger;
      const events = Storage.getEvents();
      const eventId = Number(calendarEvent.parentElement.dataset.eventIds);
      if (events[eventId]) {
        EventDetailsModal(events[eventId]);
        document.querySelector("#event-details-modal").open = true;
      }
    });
  });
