import { createElement2 } from "../../../lib/createElement.js";

export default class TimeSlot {
  slotIndex;
  dateTime;
  timeSlotElement;
  store;

  constructor(store, date, startingHour) {
    this.store = store;
    this.dateTime = date.setHours(startingHour, 0, 0);
    this.slotIndex = `${date.getDay()}-${date.getHours()}`;

    this.timeSlotElement = createElement2(`
        <div 
            class="grid-item time-slot" 
            data-slot-index="${this.slotIndex}" 
            data-date-time="${new Date(this.dateTime).toDateString()}">
        </div>`);

    this.timeSlotElement.addEventListener("click", () => {
      alert("open modal");
    });
  }

  update(date) {
    this.timeSlotElement.dataset.dateTime = date;
  }

  getElement() {
    return this.timeSlotElement;
  }

  addEvent(event) {}
}
