import CalendarHeaderColumn from "./CalendarDataElements/CalendarHeaderColumn.js";
import TimeSlot from "./CalendarDataElements/TimeSlot.js";
//todo static class extends "Container"

export default class CalendarBody {
  calendarHeaderColumnElements;
  store;
  bodyElements = [];
  parentElement = document.getElementById("calendar-body-container");

  constructor(store) {
    this.store = store;
    const headerColumn = new CalendarHeaderColumn();
    this.calendarHeaderColumnElements = headerColumn.getElements();
    this.createCalendarBody();
  }

  createCalendarBody() {
    // por cada header le agrego 7 elements.

    this.calendarHeaderColumnElements.forEach((_, index) => {
      const timeSlot = new TimeSlot(this.store, index, date);
      timeSlot.getElement();
    });
  }

  mapEvents() {}

  updateTimeSlotsData() {
    // solo tengo que updetear el dataset.dateTime
    // entonces los puedo crear vacios.

    this.store.selectedWeek.map((date) => {});
  }

  render() {}
}
