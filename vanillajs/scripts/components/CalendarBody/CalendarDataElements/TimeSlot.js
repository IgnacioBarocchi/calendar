import { createElement2 } from "../../../lib/createElement.js";

export default class TimeSlot {
  slotIndex;
  dateTime;
  timeSlotElement;
  store;

  constructor(store, startingHour, date) {
    this.store = store;
    this.slotIndex = `${date.getDay()}-${date.getHours()}`;
    this.dateTime = date.setHours(startingHour, 0, 0);

    this.timeSlotElement = createElement2(`
        <div 
            class="grid-item time-slot" 
            data-slot-index="${this.slotIndex}" 
            data-date-time="${this.dateTime}">
        </div>`);
  }

  update(date) {
    this.timeSlotElement.dataset.dateTime = date;
  }

  getElement() {
    return this.timeSlotElement;
  }

  addEvent(event) {}
}
