import {
  DAYS_ABBREVIATIONS,
  TIME_ZONE_OFFSET,
} from "../../../constants/index.js";

import appendElements from "../../../lib/appendElements.js";
import { createElement2 } from "../../../lib/createElement.js";

export default class CalendarHeaderRow {
  store;
  dayOfTheWeekElements = [];
  dateDataByDayName = {};
  parentElement = document.querySelector("#calendar-header-row-container");

  constructor(store) {
    this.store = store;

    const timeZoneOffsetElement = createElement2(`
      <div class="grid-item header-row">
        <div class="header-text-container">
          <span class="date-name">${TIME_ZONE_OFFSET}</span>
        </div>
      </div>`);

    this.updateDateOfWeekElements();

    appendElements(
      [timeZoneOffsetElement, ...this.dayOfTheWeekElements],
      this.parentElement
    );
  }

  /*private*/ updateDateDataByDayName() {
    this.store.selectedWeek.forEach((dateTime) => {
      this.dateDataByDayName[DAYS_ABBREVIATIONS[dateTime.getDay()]] = {
        date: dateTime.getDate(),
        today: dateTime.toDateString() === new Date().toDateString(),
      };
    });
  }

  updateDateOfWeekElements() {
    if (!this.store.selectedWeek) return;
    this.updateDateDataByDayName();
    const shouldCreateElements = this.dayOfTheWeekElements?.length !== 7;
    // !unnecessary variable evaluation
    // !code split: create calendar in constructor. update in render method
    if (shouldCreateElements) {
      this.dayOfTheWeekElements = Object.entries(this.dateDataByDayName).map(
        ([dayName, record]) => {
          return createElement2(`
          <div class="grid-item header-row">
            <div class="header-text-container">
              <span class="date-name">${dayName}</span>
              <span class="date-number ${
                record.today ? "today-highlight" : ""
              }">${record.date}</span>
            </div>
          </div>`);
        }
      );
    } else {
      this.dayOfTheWeekElements.forEach((element) => {
        const record =
          this.dateDataByDayName[
            element.querySelector(".date-name").textContent
          ];

        const dateELement = element.querySelector(".date-number");

        dateELement.textContent = record.date;

        dateELement.classList[record.today ? "add" : "remove"](
          "today-highlight"
        );
      });
    }
  }

  render() {
    this.updateDateOfWeekElements();
  }
}
