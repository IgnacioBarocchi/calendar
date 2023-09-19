import { createElement2 } from "../../lib/createElement.js";
import appendElements from "../../lib/appendElements.js";
import { DAYS_ABBREVIATIONS } from "../../constants/index.js";
import NavigationControls from "../../controls/NavigationControls.js";
export default class CalendarMonth {
  // save previous state | cach month
  calendarBodyElement = document.querySelector("#days-of-month-body");
  calendarHeaderElement = document.querySelector("#days-of-month-header");
  days = [];
  storage;

  constructor(storage) {
    this.storage = storage;

    appendElements(
      DAYS_ABBREVIATIONS.map((day) => {
        return createElement2(`
        <div class='calendar-day-cell'>
            <span>${day}</span>
        </div>
        `);
      }),
      this.calendarHeaderElement
    );
  }

  render() {
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
        const dateIstoday = day.toDateString() === new Date().toDateString();
        const dayOfMonthElement = createElement2(`
            <div class="calendar-day-cell ${
              dateIstoday ? "today-highlight" : ""
            }">
                <span>${day.getDate()}</span>
            </div>
        `);
        // calendar - day - cell;
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
