import { DAYS_ABBREVIATIONS } from '../../constants/index.ts';
import NavigationControls from '../../controls/NavigationControls.ts';
import Renderable from '../../interfaces/Renderable.ts';
import StorageService from '../../StorageService/StorageService.ts';
import appendElements from '../../lib/appendElements.ts';
import createElement from '../../lib/createElement.ts';
import range from '../../lib/range.ts';

export default class CalendarMonth implements Renderable {
  calendarBodyElement: HTMLElement = document.querySelector(
    '#days-of-month-body',
  )!;

  calendarHeaderElement: HTMLElement = document.querySelector(
    '#days-of-month-header',
  )!;

  monthLabel: HTMLElement = document.querySelector(
    '#days-of-month-month-label',
  )!;

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

    while (date.getMonth() === month) {
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
        const outsideOfWeek = !StorageService.selectedWeek.find(
          (dateOfWeek) => dateOfWeek.toDateString() === date.toDateString(),
        );

        if (outsideOfWeek) {
          NavigationControls.getInstance().navigateWithDaysOfMonth(date);
        }
      });
      return dayOfMonthElement;
    });

    appendElements(dateElements, this.calendarBodyElement);
  }
}
