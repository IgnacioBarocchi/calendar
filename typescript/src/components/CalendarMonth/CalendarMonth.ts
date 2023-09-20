import { DAYS_ABBREVIATIONS } from '../../constants/index.ts';
import NavigationControls from '../../controls/NavigationControls.ts';
import StorageService from '../../StorageService/StorageService.ts';
import appendElements from '../../lib/appendElements.ts';
import createElement from '../../lib/createElement.ts';
import range from '../../lib/range.ts';

export default class CalendarMonth {
  calendarBodyElement = document.querySelector('#days-of-month-body');
  calendarHeaderElement = document.querySelector('#days-of-month-header');
  monthLabel = document.querySelector('#days-of-month-month-label');

  dates: Date[] = [];

  constructor() {
    /*
    ${
      day.toLowerCase() ===
      new Date()
        .toLocaleDateString('en-US', { weekday: 'short' })
        .toLocaleLowerCase()
        ? 'highlighted-text'
        : ''
      }
    */
    appendElements(
      DAYS_ABBREVIATIONS.map((day) => {
        return createElement(`
        <div class='calendar-day-cell'>
            <span class=''>${day}</span>
        </div>
        `);
      }),
      this.calendarHeaderElement,
    );
  }

  private prependDatesFromPreviousMonth(date: Date) {
    const firstDayOfMonth = date.getDay();
    if (firstDayOfMonth === 0) return;
    const referenceDate = new Date(date);

    range(firstDayOfMonth).forEach(() => {
      referenceDate.setDate(referenceDate.getDate() - 1);
      this.dates.unshift(new Date(referenceDate));
    });

    /* 
    //todo: depending on the current month duration 30 | 31 | 28
    const daysToPrepend = 7;
    const lastDayOfPreviousMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      0,
    );
    //* +1 to start from the previous month
    lastDayOfPreviousMonth.setDate(
      lastDayOfPreviousMonth.getDate() - daysToPrepend + 1,
    );

    range(daysToPrepend).forEach(() => {
      this.dates.push(new Date(lastDayOfPreviousMonth));
      // update, don't create new
      lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() + 1);
    });
    */
  }

  render() {
    if (!this.monthLabel) return;

    this.monthLabel.textContent = StorageService.getMonthOfYear();
    const stratDate = StorageService.selectedWeek[0];
    const month = stratDate.getMonth();
    const year = stratDate.getFullYear();

    this.dates = [];
    const date = new Date(year, month, 1);
    this.prependDatesFromPreviousMonth(date);

    while (date.getMonth() === month && this.dates.length < 31) {
      this.dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    const dateElements = this.dates.map((date) => {
      const dayOfMonthElement = createElement(`
          <div class="calendar-day-cell ${
            date.toDateString() === new Date().toDateString()
              ? 'today-highlight'
              : ''
          }">
              <span>${date.getDate()}</span>
          </div>
      `);

      dayOfMonthElement.addEventListener('click', () => {
        if (
          !StorageService.selectedWeek.find(
            (date) => date.toDateString() === date.toDateString(),
          )
        ) {
          NavigationControls.getInstance().navigateWithDaysOfMonth(date);
        }
      });
      return dayOfMonthElement;
    });

    appendElements(dateElements, this.calendarBodyElement);
  }
}
