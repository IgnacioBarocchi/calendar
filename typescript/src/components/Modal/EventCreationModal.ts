import Modal, { Position } from './@Modal';

import CalendarEventCreationForm from '../CalendarEventCreationForm/CalendarEventCreationForm.ts';

class EventCreationModal extends Modal {
  private static instance: EventCreationModal | null = null;

  private constructor() {
    super(
      document.querySelector('#event-creation-modal') as HTMLElement,
      document.querySelector(
        '#event-creation-close-modal-button',
      ) as HTMLElement,
    );

    document.querySelector('#aside-create-event-button')?.addEventListener(
      'click',
      function (clientEvent: PointerEvent) {
        CalendarEventCreationForm.autoFillDates(new Date());
        this.open([clientEvent.clientX, clientEvent.clientY]);
      }.bind(this),
    );
  }

  public static getInstance(): EventCreationModal {
    if (!EventCreationModal.instance) {
      EventCreationModal.instance = new EventCreationModal();
    }
    return EventCreationModal.instance;
  }

  open(position: Position) {
    this.show(position);
  }

  close() {
    document.querySelectorAll('.draft').forEach((draft) => {
      draft.remove();
    });
    this.hide();
  }
}

export default EventCreationModal.getInstance();
