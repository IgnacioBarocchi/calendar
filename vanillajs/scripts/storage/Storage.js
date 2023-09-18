import { getWeekFrom } from "../helpers/calendarHelper.js";
import mapRange from "../lib/mapRange.js";

// ! TENGO QUE USAR SESSION STORAGE PORQUE NO TENGO SINGLETON
export default class Storage {
  selectedWeek;

  constructor() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.clear();
    });

    sessionStorage.setItem(
      "cashedWeeks",
      JSON.stringify([getWeekFrom(new Date())])
    );

    this.setSelectedWeek(new Date(), 0);
  }

  /*Local*/
  _getEvents() {
    if (!localStorage.length) {
      localStorage.setItem("events", "{}");
    }
    return JSON.parse(localStorage.getItem("events"));
  }

  addEvent(event) {
    const events = this._getEvents();
    const slotIndex = `${event.startDateTime.getDay()}-${event.startDateTime.getHours()}`;
    const eventsOfTheSlot = events[slotIndex] || [];

    // ! replace by seed random | nano id npm module
    event.id = String(
      Object.values(events).flat().length +
        Math.random() * 10000 +
        new Date().getSeconds()
    ).replace(".", "");

    eventsOfTheSlot.push(event);

    localStorage.setItem(
      "events",
      JSON.stringify({ ...events, [slotIndex]: eventsOfTheSlot })
    );
  }

  getEventsBySlotIndex = (slotIndex) => {
    const events = this._getEvents();
    const eventsOfTheSlot = events[slotIndex];
    if (!eventsOfTheSlot?.length) return [];

    // ! remove query!!!
    const timeSlotDayTime = new Date(
      document.querySelector(
        `[data-slot-index="${slotIndex}"]`
      ).dataset.dateTime
    );

    return eventsOfTheSlot.filter((event) => {
      const eventDate = new Date(event.startDateTime);
      console.log(eventDate.getHours());
      console.log(eventDate.getDate());
      console.log(timeSlotDayTime.getHours());
      console.log(timeSlotDayTime.getDate());
      return (
        eventDate.getHours() === timeSlotDayTime.getHours() &&
        eventDate.getDate() === timeSlotDayTime.getDate()
      );
    });
  };

  deleteEventById(targetId) {
    localStorage.setItem(
      "events",
      JSON.stringify(
        Object.fromEntries(
          Object.entries(events).map(([key, itsEvents]) => {
            return [key, itsEvents.filter((event) => event.id !== targetId)];
          })
        )
      )
    );
  }

  /*Session*/
  cashWeek(week, index) {
    const cashedWeeks = JSON.parse(sessionStorage.getItem("cashedWeeks"));
    cashedWeeks[index] = week;
    sessionStorage.setItem("cashedWeeks", JSON.stringify(cashedWeeks, null, 2));
  }

  setSelectedWeek(date, index) {
    const cashedWeeks = JSON.parse(sessionStorage.getItem("cashedWeeks")).map(
      (dateTimeString) => new Date(dateTimeString)
    );

    if (cashedWeeks[index] && cashedWeeks[index].length) {
      const cashedWeek = cashedWeeks[index];
      this.selectedWeek = cashedWeek;
      return this.selectedWeek;
    }

    const startDate = new Date(date.setDate(date.getDate() - date.getDay()));

    const week = mapRange(0, 7, (dayNumber) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + dayNumber);
      return currentDate;
    });

    if (week && week.length > 0) {
      this.cashWeek(week, index);
      this.selectedWeek = week;
    } else {
      throw new Error("Week error");
    }
  }

  getSelectedWeek() {
    return this.selectedWeek;
  }
}
