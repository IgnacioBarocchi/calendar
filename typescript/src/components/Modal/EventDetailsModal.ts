import Modal, { Position } from './@Modal';

import StorageService from '../../StorageService/StorageService';

class EventDetailsModal extends Modal {
  private static instance: EventDetailsModal | null = null;

  private constructor() {
    super(
      document.querySelector('#event-details-modal') as HTMLElement,
      document.querySelector(
        '#event-details-close-modal-button',
      ) as HTMLElement,
    );
  }

  public static getInstance(): EventDetailsModal {
    if (!EventDetailsModal.instance) {
      EventDetailsModal.instance = new EventDetailsModal();
    }
    return EventDetailsModal.instance;
  }

  open(calendarEventElement: HTMLElement, position: Position) {
    const calendarEvent = JSON.parse(
      calendarEventElement.dataset.calendarEvent,
    );

    this.modalElement.querySelector('#event-details-title').textContent =
      calendarEvent.title;

    this.modalElement.querySelector('#event-details-description').textContent =
      calendarEvent.description;

    // !todo constructor!!!!
    this.modalElement.querySelector('#delete-event-button').addEventListener(
      'click',
      function () {
        // ! logical coupling: depends on the data attribute to delete an element!
        StorageService.deleteEventById(calendarEvent.id);
        calendarEventElement.remove();
        this.close();
      }.bind(this),
    );

    this.show(position);
  }

  close() {
    this.hide();
    document.querySelectorAll('.draft').forEach((draft) => {
      draft.remove();
    });
  }
}

export default EventDetailsModal.getInstance();
