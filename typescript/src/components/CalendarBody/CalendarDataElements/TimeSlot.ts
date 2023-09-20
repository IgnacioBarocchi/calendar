import CalendarEvent from '../../CalendarEvent/CalendarEvent.ts';
import CalendarEventCreationForm from '../../CalendarEventCreationForm/CalendarEventCreationForm.ts';
import EventCreationModal from '../../Modal/EventCreationModal.ts';
import createElement from '../../../lib/createElement.ts';

export default class TimeSlot {
  slotIndex;
  dateTime;
  timeSlotElement;

  constructor(dateTime: Date, startingHour: number) {
    this.slotIndex = `${dateTime.getDay()}-${startingHour}`;
    const dateTimeValue = new Date(dateTime).setHours(startingHour, 0, 0);
    this.dateTime = new Date(dateTimeValue);
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
    const draftTimeSlotEvent = new CalendarEvent(
      {
        stage: 'draft',
        title: `(no title), ${this.dateTime.getHours()}`,
        startDateTime: this.dateTime,
        endDateTime: new Date(new Date(this.dateTime).setMinutes(30)),
      },
      this.timeSlotElement,
    );

    CalendarEventCreationForm.autoFillDates(this.dateTime);
    draftTimeSlotEvent.render();
  }

  update(date: Date) {
    this.timeSlotElement.dataset.dateTime = date;
  }

  getElement() {
    return this.timeSlotElement;
  }
}
