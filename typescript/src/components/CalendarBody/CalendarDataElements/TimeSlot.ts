import CalendarEvent from '../../CalendarEvent/CalendarEvent.ts';
import CalendarEventCreationForm from '../../CalendarEventCreationForm/CalendarEventCreationForm.ts';
import EventCreationModal from '../../Modal/EventCreationModal.ts';
import createElement from '../../../lib/createElement.ts';

export default class TimeSlot {
  slotIndex;
  initialDateTime;
  timeSlotElement;

  constructor(dateTime: Date, startingHour: number) {
    this.slotIndex = `${dateTime.getDay()}-${startingHour}`;
    const dateTimeValue = new Date(dateTime).setHours(startingHour, 0, 0);
    this.initialDateTime = new Date(dateTimeValue);
    this.timeSlotElement = createElement(`
        <div 
            class="grid-item time-slot" 
            data-slot-index="${this.slotIndex}" 
            data-date-time="${dateTime}">
        </div>`);

    function createDraftEvent(this: HTMLElement, clientEvent: PointerEvent) {
      if (!this.dataset.dateTime) return;
      const currentDateTime = new Date(this.dataset.dateTime);

      const draftTimeSlotEvent = new CalendarEvent(
        {
          stage: 'draft',
          title: `(no title), ${currentDateTime.getHours()}`,
          startDateTime: currentDateTime,
          endDateTime: new Date(new Date(currentDateTime).setMinutes(30)),
        },
        this,
      );

      CalendarEventCreationForm.autoFillDates(currentDateTime);
      draftTimeSlotEvent.render();

      EventCreationModal.open([clientEvent.clientX, clientEvent.clientY]);
    }

    this.timeSlotElement.addEventListener('click', createDraftEvent);
  }

  update(date: Date) {
    this.timeSlotElement.dataset.dateTime = date + '';
  }

  getElement(): HTMLElement {
    return this.timeSlotElement;
  }
}
