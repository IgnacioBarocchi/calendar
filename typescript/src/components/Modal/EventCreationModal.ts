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

    const asideCreateEventButton = document.querySelector(
      '#aside-create-event-button',
    )!;

    function handleEventCreation(clientEvent: PointerEvent) {
      CalendarEventCreationForm.autoFillDates(new Date());
      // @ts-ignore
      this.open([clientEvent.clientX, clientEvent.clientY]);
    }

    // @ts-ignore
    asideCreateEventButton?.addEventListener(
      'click',
      handleEventCreation.bind(this),
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
