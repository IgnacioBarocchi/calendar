import CalendarEvent from "../../CalendarEvent/CalendarEvent.ts";
import CalendarEventCreationForm from "../../CalendarEventCreationForm/CalendarEventCreationForm.ts";
import ModalComponent from "../../Modal/Modal.ts";
import { createElement2 } from "../../../lib/createElement.ts";

export default class TimeSlot {
  slotIndex;
  dateTime;
  timeSlotElement;
  storage;

  constructor(storage, dateTime, startingHour) {
    this.storage = storage;
    this.slotIndex = `${dateTime.getDay()}-${startingHour}`;
    const dateTimeValue = new Date(dateTime).setHours(startingHour, 0, 0);
    this.dateTime = new Date(dateTimeValue);
    this.timeSlotElement = createElement2(`
        <div 
            class="grid-item time-slot" 
            data-slot-index="${this.slotIndex}" 
            data-date-time="${dateTime}">
        </div>`);

    this.timeSlotElement.addEventListener(
      "click",
      function (clientEvent) {
        this._renderDraftCalendarEvent();

        ModalComponent.openCreateEventModal([
          clientEvent.clientX,
          clientEvent.clientY,
        ]);
      }.bind(this)
    );
  }
  _renderDraftCalendarEvent() {
    const draftTimeSlotEvent = new CalendarEvent(
      {
        stage: "draft",
        title: `(no title), ${this.dateTime.getHours()}`,
        startDateTime: this.dateTime,
        endDateTime: new Date(new Date(this.dateTime).setMinutes(30)),
      },
      this.timeSlotElement
    );

    // !!!!new instance lol duplicated records!!!!!!!!!!!!!
    const form = new CalendarEventCreationForm(this.storage);
    form.autoFillDates(this.dateTime);
    draftTimeSlotEvent.render();
  }

  update(date) {
    this.timeSlotElement.dataset.dateTime = date;
  }

  getElement() {
    return this.timeSlotElement;
  }

  addEvent(event) {}
}
