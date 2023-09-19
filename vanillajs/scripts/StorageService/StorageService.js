import mapRange from "../lib/mapRange.js";
import { MONTHS } from "../constants/index.js";
export default class StorageService {
  selectedWeek;

  constructor() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.clear();
    });

    this.setSelectedWeek(new Date(), 0);
    sessionStorage.setItem("cachedWeeks", JSON.stringify([]));
  }

  /*Local*/
  _getEvents() {
    if (!localStorage.length) {
      localStorage.setItem("events", "{}");
    }
    return JSON.parse(localStorage.getItem("events"));
  }

  getTodayEvents() {
    const events = _getEvents();
    // dateTime.toDateString() === new Date().toDateString()
  }

  saveEvent(event) {
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
          Object.entries(this._getEvents()).map(([key, itsEvents]) => {
            return [key, itsEvents.filter((event) => event.id !== targetId)];
          })
        )
      )
    );
  }

  getMonthOfYear() {
    const referenceSunday = this.selectedWeek[0];
    return `
      ${MONTHS[referenceSunday.getMonth()]} ${referenceSunday.getFullYear()}`;
  }

  /*Session*/
  cachWeek(week, index) {
    const cachedWeeks = JSON.parse(sessionStorage.getItem("cachedWeeks")) || [];
    cachedWeeks[index] = week;
    sessionStorage.setItem("cachedWeeks", JSON.stringify(cachedWeeks, null, 2));
  }

  setSelectedWeek(date, index) {
    const cachedWeeks = JSON.parse(sessionStorage.getItem("cachedWeeks"))?.map(
      (dateTimeString) => new Date(dateTimeString)
    );

    if (cachedWeeks && cachedWeeks[index]?.length) {
      const cachedWeek = cachedWeeks[index];
      this.selectedWeek = cachedWeek;
      return this.selectedWeek;
    }

    const startDate = new Date(date.setDate(date.getDate() - date.getDay()));

    const week = mapRange(0, 7, (dayNumber) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + dayNumber);
      return currentDate;
    });

    if (week && week.length > 0) {
      this.cachWeek(week, index);
      this.selectedWeek = week;
    } else {
      throw new Error("Week error");
    }
  }

  getSelectedWeek() {
    return this.selectedWeek;
  }
}
