import { DAYS_ABBREVIATIONS } from "../../constants/index.js";
import NavigationControls from "../../controls/NavigationControls.js";
import appendElements from "../../lib/appendElements.js";
import { createElement2 } from "../../lib/createElement.js";
export default class CalendarMonth {
  // save previous state | cach month
  calendarBodyElement = document.querySelector("#days-of-month-body");
  calendarHeaderElement = document.querySelector("#days-of-month-header");
  monthLabel = document.querySelector("#days-of-month-month-label");

  days = [];
  storage;

  constructor(storage) {
    this.storage = storage;

    appendElements(
      DAYS_ABBREVIATIONS.map((day) => {
        return createElement2(`
        <div class='calendar-day-cell'>
            <span class='${
              day.toLowerCase() ===
              new Date()
                .toLocaleDateString("en-US", { weekday: "short" })
                .toLocaleLowerCase()
                ? "highlighted-text"
                : ""
            }'>${day}</span>
        </div>
        `);
      }),
      this.calendarHeaderElement
    );
  }

  render() {
    this.monthLabel.textContent = this.storage.getMonthOfYear();
    const stratDate = this.storage.selectedWeek[0];
    const month = stratDate.getMonth();
    const year = stratDate.getFullYear();

    this.days = [];
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      this.days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    appendElements(
      this.days.map((day) => {
        const dayOfMonthElement = createElement2(`
            <div class="calendar-day-cell ${
              day.toDateString() === new Date().toDateString()
                ? "today-highlight"
                : ""
            }">
                <span>${day.getDate()}</span>
            </div>
        `);

        dayOfMonthElement.addEventListener("click", () => {
          if (
            !this.storage.selectedWeek.find(
              (date) => date.toDateString() === day.toDateString()
            )
          ) {
            const navigationControls = new NavigationControls();
            navigationControls.navigateWithDaysOfMonth(date);
          }
        });
        return dayOfMonthElement;
      }),
      this.calendarBodyElement
    );
  }
}
