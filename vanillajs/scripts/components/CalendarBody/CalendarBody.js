import CalendarEvent from "../CalendarEvent/CalendarEvent.js";
import CalendarHeaderColumn from "./CalendarDataElements/CalendarHeaderColumn.js";
import TimeSlot from "./CalendarDataElements/TimeSlot.js";
import appendElements from "../../lib/appendElements.js";
//todo static class extends "Container"

export default class CalendarBody {
  calendarHeaderColumnElements;
  storage;
  timeSlotElements = [];
  parentElement = document.getElementById("calendar-body-container");
  timeSlotInstances = [];

  constructor(storage) {
    this.storage = storage;
    const headerColumn = new CalendarHeaderColumn();
    this.calendarHeaderColumnElements = headerColumn.getElements();
    this.createCalendarBody();
  }

  createCalendarBody() {
    const bodyElements = [];
    this.calendarHeaderColumnElements.forEach((hourOfDayElement, i) => {
      bodyElements.push(hourOfDayElement);
      this.storage.selectedWeek.forEach((dateTime) => {
        const timeSlot = new TimeSlot(this.storage, dateTime, i);
        const timeSlotElement = timeSlot.getElement();
        bodyElements.push(timeSlotElement);
        this.timeSlotElements.push(timeSlotElement);
      });
    });

    appendElements(bodyElements, this.parentElement);
  }

  mapEvents() {}

  updateTimeSlotsData() {
    const week = [...this.storage.selectedWeek];

    this.timeSlotElements.forEach((timeSlotElement) => {
      timeSlotElement.innerHTML = "";

      const [dayNumber, hour] = timeSlotElement.dataset.slotIndex.split("-");

      const dayTimeValue = week[dayNumber]?.setHours(hour, 0, 0);

      timeSlotElement.dataset.dateTime = new Date(dayTimeValue);

      const slotEvents = this.storage.getEventsBySlotIndex(
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
