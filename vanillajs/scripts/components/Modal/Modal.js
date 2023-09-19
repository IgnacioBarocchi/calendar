// todo: abstract class modal => open: () => void
import StorageService from "../../StorageService/StorageService.js";
export class Modal {
  storage;
  eventCreationModalElement = document.querySelector("#event-modal");
  eventDetailsModalElement = document.querySelector("#event-details-modal");
  eventCreationButtonElement = document.querySelector("#create-event-button");

  constructor(storage) {
    this.storage = storage;

    this.eventCreationModalElement
      .querySelector(".close-button")
      .addEventListener("click", () => {
        this.closeCreateEventModal();
      });

    this.eventDetailsModalElement
      .querySelector(".close-button")
      .addEventListener("click", () => {
        this.closeEventDetailsModal();
      });

    // todo:
    // this.eventCreationButtonElement.addEventListener("click", () => {});
    // function (e) {
    //   alert("a");
    //   // this.openCreateEventModal();
    // } //.bind(this)
    document.addEventListener(
      "keypress",
      function (e) {
        if (e.key == "Escape") alert("test");
      }.bind(this)
    );
  }

  openCreateEventModal(position) {
    this._open(this.eventCreationModalElement, position);
  }

  openEventDetailsModal(position) {
    this._open(this.eventDetailsModalElement, position);
  }

  showEventDetails(calendarEventElement, position) {
    this.openEventDetailsModal(position);
    const calendarEvent = JSON.parse(
      calendarEventElement.dataset.calendarEvent
    );

    this.eventDetailsModalElement.querySelector(
      "#event-details-title"
    ).textContent = calendarEvent.title;

    this.eventDetailsModalElement.querySelector(
      "#event-details-description"
    ).textContent = calendarEvent.description;

    // !todo constructor!!!!
    this.eventDetailsModalElement
      .querySelector("#delete-event-button")
      .addEventListener(
        "click",
        function () {
          debugger;
          this.storage.deleteEventById(calendarEvent.id);
          calendarEventElement.remove();
          this.closeEventDetailsModal();
        }.bind(this)
      );
  }

  closeCreateEventModal() {
    this._close(this.eventCreationModalElement);
    this._removeDraftEvents();
  }

  closeEventDetailsModal() {
    this._close(this.eventDetailsModalElement);
  }

  _open(modal, position) {
    const [left, top] = this._getModalPosition(position, modal);
    modal.showModal();
    modal.style.top = top + "px";
    modal.style.left = left + "px";
  }

  _close(modal) {
    modal.close();
  }

  _getModalPosition(clientPosition, modal) {
    const [x, y] = clientPosition;

    const maxLeft = window.innerWidth - modal.offsetWidth;
    const maxTop = window.innerHeight - modal.offsetHeight;

    return [
      Math.min(Math.max(0, x), maxLeft),
      Math.min(Math.max(0, y), maxTop),
    ];
  }

  _removeDraftEvents() {
    document.querySelectorAll(".draft").forEach((draft) => {
      draft.remove();
    });
  }
}
const st = new StorageService();

export default new Modal(st);
