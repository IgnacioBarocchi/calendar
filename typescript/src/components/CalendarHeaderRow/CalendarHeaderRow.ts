import { DAYS_ABBREVIATIONS, TIME_ZONE_OFFSET } from '../../constants/index.ts';

import Renderable from '../../interfaces/Renderable.ts';
import StorageService from '../../StorageService/StorageService.ts';
import appendElements from '../../lib/appendElements.ts';
import createElement from '../../lib/createElement.ts';

export default class CalendarHeaderRow implements Renderable {
  private static instance: CalendarHeaderRow;

  private dayOfTheWeekElements: HTMLElement[] = [];
  private dateDataByDayName: {
    [dayName: string]: {
      date: number;
      today: boolean;
    };
  } = {};

  private parentElement = document.querySelector(
    '#calendar-header-row-container',
  )!;

  private monthLabel = document.querySelector('#header-month-label');

  private constructor() {
    const timeZoneOffsetElement = createElement(`
      <div class="grid-item header-row">
        <div class="header-text-container">
          <span class="date-name">${TIME_ZONE_OFFSET}</span>
        </div>
      </div>`);

    this.updateDateOfWeekElements();

    appendElements(
      [timeZoneOffsetElement, ...this.dayOfTheWeekElements],
      this.parentElement,
    );
  }

  public static getInstance(): CalendarHeaderRow {
    if (!CalendarHeaderRow.instance) {
      CalendarHeaderRow.instance = new CalendarHeaderRow();
    }
    return CalendarHeaderRow.instance;
  }

  private updateDateDataByDayName() {
    StorageService.selectedWeek.forEach((dateTime) => {
      this.dateDataByDayName[DAYS_ABBREVIATIONS[dateTime.getDay()]] = {
        date: dateTime.getDate(),
        today: dateTime.toDateString() === new Date().toDateString(),
      };
    });
  }

  private updateDateOfWeekElements() {
    if (!StorageService.selectedWeek) return;
    this.updateDateDataByDayName();
    const shouldCreateElements = this.dayOfTheWeekElements?.length !== 7;
    // !unnecessary variable evaluation
    // !code split: create calendar in constructor. update in render method
    if (shouldCreateElements) {
      this.dayOfTheWeekElements = Object.entries(this.dateDataByDayName).map(
        ([dayName, record]) => {
          return createElement(`
          <div class="grid-item header-row">
            <div class="header-text-container">
              <span class="date-name">${dayName}</span>
              <span class="date-number ${
                record.today ? 'today-highlight' : ''
              }">${record.date}</span>
            </div>
          </div>`);
        },
      );
    } else {
      this.dayOfTheWeekElements.forEach((element: HTMLElement) => {
        const dayName = element.querySelector('.date-name')!.textContent;

        if (!dayName) return;

        const record = this.dateDataByDayName[dayName];

        const dateElement = element.querySelector('.date-number')!;

        dateElement.textContent = record.date + '';

        dateElement.classList[record.today ? 'add' : 'remove'](
          'today-highlight',
        );
      });
    }
  }

  private updateMonthLabel() {
    if (!this.monthLabel) return;
    this.monthLabel.textContent = StorageService.getMonthOfYear();
  }

  public render() {
    this.updateMonthLabel();
    this.updateDateOfWeekElements();
  }
}
