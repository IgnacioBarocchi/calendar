import CalendarHeaderColumn from "./CalendarDataElements/CalendarHeaderColumn.js";
import TimeSlot from "./CalendarDataElements/TimeSlot.js";
import appendElements from "../../lib/appendElements.js";
//todo static class extends "Container"

export default class CalendarBody {
  calendarHeaderColumnElements;
  store;
  timeSlotElements = [];
  parentElement = document.getElementById("calendar-body-container");
  timeSlotInstances = [];

  constructor(store) {
    this.store = store;
    const headerColumn = new CalendarHeaderColumn();
    this.calendarHeaderColumnElements = headerColumn.getElements();
    this.createCalendarBody();
  }

  createCalendarBody() {
    const bodyElements = [];
    this.calendarHeaderColumnElements.forEach((hourOfDayElement, i) => {
      bodyElements.push(hourOfDayElement);
      this.store.selectedWeek.forEach((dateTime) => {
        const timeSlot = new TimeSlot(this.store, dateTime, i);
        const timeSlotElement = timeSlot.getElement();
        bodyElements.push(timeSlotElement);
        this.timeSlotElements.push(timeSlotElement);
      });
    });

    appendElements(bodyElements, this.parentElement);
  }

  mapEvents() {}

  updateTimeSlotsData() {
    // this.store.selectedWeek.forEach((dateTime) => {
    // });

    // ! add/remove events.
    this.timeSlotElements.forEach((timeSlotElement) => {
      const [dayNumber, dateNumber] =
        timeSlotElement.dataset.slotIndex.split("-");
      const dateTime = this.store.selectedWeek[dayNumber];
      timeSlotElement.dataset.dateTime = new Date(dateTime).toDateString();
    });
  }

  render() {
    this.updateTimeSlotsData();
  }
}
