import { getWeekFrom } from "../helpers/calendarHelper.js";
import mapRange from "../lib/mapRange.js";

// ! TENGO QUE USAR SESSION STORAGE PORQUE NO TENGO SINGLETON
export default class SessionStorageService2 {
  selectedWeek;
  events;

  constructor() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.clear();
    });

    sessionStorage.setItem(
      "cashedWeeks",
      JSON.stringify([getWeekFrom(new Date())])
    );

    this.setSelectedWeek(new Date(), 0);

    localStorage.setItem("events", "{}");
  }

  /*Local*/
  getEvents() {}

  addEvent(event) {}

  getEventsBySlotIndex() {}

  deleteEventById(targetId) {}

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

    const startDate = new Date(date.setDate(date.getDate()));
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
