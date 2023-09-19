import { createElement2 } from "../../lib/createElement.js";
import appendElements from "../../lib/appendElements.js";

export default class CalendarMonth {
  // save previous state | cach month
  parentElement = document.querySelector("#days-of-month-body");
  days = [];
  storage;

  constructor(storage) {
    this.storage = storage;
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
        return createElement2(`
      <div class='calendar-day-cell'>
          <span>${day.getDate()}</span>
      </div>
      `);
      }),
      this.parentElement
    );
  }
}
