import { DAYS_ABBREVIATIONS } from '../../constants/index.ts';
import NavigationControls from '../../controls/NavigationControls.ts';
import StorageService from '../../StorageService/StorageService.ts';
import appendElements from '../../lib/appendElements.ts';
import createElement from '../../lib/createElement.ts';

export default class CalendarMonth {
  calendarBodyElement = document.querySelector('#days-of-month-body');
  calendarHeaderElement = document.querySelector('#days-of-month-header');
  monthLabel = document.querySelector('#days-of-month-month-label');

  days: Date[] = [];

  constructor() {
    appendElements(
      DAYS_ABBREVIATIONS.map((day) => {
        return createElement(`
        <div class='calendar-day-cell'>
            <span class='${
              day.toLowerCase() ===
              new Date()
                .toLocaleDateString('en-US', { weekday: 'short' })
                .toLocaleLowerCase()
                ? 'highlighted-text'
                : ''
            }'>${day}</span>
        </div>
        `);
      }),
      this.calendarHeaderElement,
    );
  }

  render() {
    this.monthLabel.textContent = StorageService.getMonthOfYear();
    const stratDate = StorageService.selectedWeek[0];
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
        const dayOfMonthElement = createElement(`
            <div class="calendar-day-cell ${
              day.toDateString() === new Date().toDateString()
                ? 'today-highlight'
                : ''
            }">
                <span>${day.getDate()}</span>
            </div>
        `);

        dayOfMonthElement.addEventListener('click', () => {
          if (
            !StorageService.selectedWeek.find(
              (date) => date.toDateString() === day.toDateString(),
            )
          ) {
            NavigationControls.getInstance().navigateWithDaysOfMonth(date);
          }
        });
        return dayOfMonthElement;
      }),
      this.calendarBodyElement,
    );
  }
}
