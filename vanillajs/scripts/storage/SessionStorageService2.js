import { getWeekFrom } from "../helpers/calendarHelper.js";
import mapRange from "../lib/mapRange.js";

// ! TENGO QUE USAR SESSION STORAGE PORQUE NO TENGO SINGLETON
export default class SessionStorageService2 {
  selectedWeek = [];

  constructor() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.clear();
    });

    sessionStorage.setItem(
      "cashedWeeks",
      JSON.stringify([getWeekFrom(new Date())])
    );
  }

  cashWeek(week, index) {
    const cashedWeeks = JSON.parse(sessionStorage.getItem("cashedWeeks"));
    cashedWeeks[index] = week;
    sessionStorage.setItem("cashedWeeks", JSON.stringify(cashedWeeks, null, 2));
  }

  setSelectedWeek(date, index) {
    const cashedWeeks = JSON.parse(sessionStorage.getItem("cashedWeeks"));
    if (cashedWeeks[index] && cashedWeeks[index].length) {
      return cashedWeeks[index];
    }

    const startDate = new Date(date.setDate(date.getDate()));
    const week = mapRange(0, 7, (dayNumber) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + dayNumber);
      return currentDate;
    });

    this.cashWeek(week, index);
    this.selectedWeek = week;
    console.log(this.selectedWeek);
  }

  getSelectedWeek() {
    return this.selectedWeek;
  }
}
