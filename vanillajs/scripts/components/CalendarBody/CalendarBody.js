import CalendarEvent from "../CalendarEvent/CalendarEvent.js";
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
    const week = [...this.store.selectedWeek];

    this.timeSlotElements.forEach((timeSlotElement) => {
      timeSlotElement.innerHTML = "";

      const [dayNumber, hour] = timeSlotElement.dataset.slotIndex.split("-");

      const dayTimeValue = week[dayNumber]?.setHours(hour, 0, 0);

      timeSlotElement.dataset.dateTime = new Date(dayTimeValue);

      const slotEvents = this.store.getEventsBySlotIndex(
        timeSlotElement.dataset.slotIndex
      );

      if (slotEvents?.length) {
        slotEvents.forEach((slotEvent) => {
          const timeSlotEvent = new CalendarEvent(slotEvent, timeSlotElement);
          timeSlotEvent.render();
        });
      }
    });
  }

  render() {
    this.updateTimeSlotsData();
  }
}
