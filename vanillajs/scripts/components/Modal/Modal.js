// todo: abstract class modal => open: () => void

export class Modal {
  createEventModalElement = document.querySelector("#event-modal");
  eventDetailsModalElement = document.querySelector("#event-details-modal");

  constructor() {
    this.createEventModalElement
      .querySelector(".close-button")
      .addEventListener("click", () => {
        this.closeCreateEventModal();
      });

    this.eventDetailsModalElement
      .querySelector(".close-button")
      .addEventListener("click", () => {
        this.closeEventDetailsModal();
      });

    document.body.addEventListener("keypress", function (e) {
      if (e.key == "Escape") alert("a");
    });
  }

  openCreateEventModal(position) {
    this._open(this.createEventModalElement, position);
  }

  openEventDetailsModal(position) {
    this._open(this.eventDetailsModalElement, position);
  }

  closeCreateEventModal() {
    this._close(this.createEventModalElement);
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

export default new Modal();
