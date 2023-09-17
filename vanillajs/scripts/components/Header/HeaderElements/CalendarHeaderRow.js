import {
  DAYS_ABBREVIATIONS,
  TIME_ZONE_OFFSET,
} from "../../../constants/index.js";

import appendElements from "../../../lib/appendElements.js";
import { createElement2 } from "../../../lib/createElement.js";

export default class CalendarHeaderRow {
  store;
  headerElements;
  parentElement = document.querySelector("#calendar-header-row-container");

  constructor(store) {
    this.store = store;
  }

  /*private*/ getTimeZoneOffsetDataHTMLStringFragment() {
    return `<span class="date-name">${TIME_ZONE_OFFSET}</span>`;
  }

  /*private*/ getDateDataHTMLStringFragment(dateName, dateNumber, highlight) {
    return `
            <span class="date-name">${dateName}</span>
            <span class="date-number ${
              highlight ? "today-highlight" : ""
            }">${dateNumber}</span>
        `;
  }

  renderTimeZoneOffsetItem() {
    const timeZoneOffsetElement = createElement2(`
      <div class="grid-item header-row">
        <div class="header-text-container">
          ${this.getTimeZoneOffsetDataHTMLStringFragment()}
        </div>
      </div>`);
    this.headerElements = [timeZoneOffsetElement];
  }

  renderWeekDaysItems() {
    if (!this.store.selectedWeek) return;
    this.store.selectedWeek.map((dateTime) => {
      const dataHTMLStringElements = this.getDateDataHTMLStringFragment(
        DAYS_ABBREVIATIONS[dateTime.getDay()],
        dateTime.getDate(),
        dateTime.toDateString() === new Date().toDateString()
      );

      const dateHeaderElement = createElement2(`
      <div class="grid-item header-row">
        <div class="header-text-container">
          ${dataHTMLStringElements}
        </div>
      </div>`);

      this.headerElements.push(dateHeaderElement);

      return dateHeaderElement;
    });
  }

  clearElementsData() {
    this.headerElements.forEach((element, index) => {
      // !skip timezone offset
      if (index === 0) return;

      element.querySelector(".date-name");
      element.querySelector(".date-date-number");
    });
  }

  render() {
    this.renderTimeZoneOffsetItem();
    this.renderWeekDaysItems();
    console.log(this.headerElements);
    this.clearElementsData();
    // if (this.parentElement) {
    // } else {
    appendElements(this.headerElements, this.parentElement);
    // }
  }
}
