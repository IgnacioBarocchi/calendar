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

    this.timeSlotElement.addEventListener(
      'click',
      function (clientEvent: PointerEvent) {
        this.renderDraftCalendarEvent();

        EventCreationModal.open([clientEvent.clientX, clientEvent.clientY]);
      }.bind(this),
    );
  }

  private renderDraftCalendarEvent() {
    const currentDateTime = new Date(this.timeSlotElement.dataset.dateTime);

    const draftTimeSlotEvent = new CalendarEvent(
      {
        stage: 'draft',
        title: `(no title), ${currentDateTime.getHours()}`,
        startDateTime: currentDateTime,
        endDateTime: new Date(new Date(currentDateTime).setMinutes(30)),
      },
      this.timeSlotElement,
    );

    CalendarEventCreationForm.autoFillDates(currentDateTime);
    draftTimeSlotEvent.render();
  }

  update(date: Date) {
    this.timeSlotElement.dataset.dateTime = date;
  }

  getElement() {
    return this.timeSlotElement;
  }
}
