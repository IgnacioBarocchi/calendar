import CalendarEvent, {
  CalendarEventRecord,
} from '../CalendarEvent/CalendarEvent.ts';

import CalendarHeaderColumn from './CalendarDataElements/CalendarHeaderColumn.ts';
import Renderable from '../../interfaces/Renderable.ts';
import StorageService from '../../StorageService/StorageService.ts';
import TimeSlot from './CalendarDataElements/TimeSlot.ts';
import appendElements from '../../lib/appendElements.ts';

export default class CalendarBody implements Renderable {
  private static instance: CalendarBody;

  private constructor() {
    this.calendarHeaderColumnElements = CalendarHeaderColumn.getElements();
    this.createCalendarBody();
  }

  public static getInstance(): CalendarBody {
    if (!CalendarBody.instance) {
      CalendarBody.instance = new CalendarBody();
    }
    return CalendarBody.instance;
  }

  private calendarHeaderColumnElements;
  private timeSlotElements: HTMLElement[] = [];
  private parentElement = document.getElementById('calendar-body-container')!;

  private createCalendarBody() {
    const bodyElements: HTMLElement[] = [];
    this.calendarHeaderColumnElements.forEach((hourOfDayElement, i) => {
      bodyElements.push(hourOfDayElement);
      StorageService.selectedWeek.forEach((dateTime) => {
        const timeSlot = new TimeSlot(dateTime, i);
        const timeSlotElement = timeSlot.getElement();
        bodyElements.push(timeSlotElement);
        this.timeSlotElements.push(timeSlotElement);
      });
    });

    appendElements(bodyElements, this.parentElement);
  }

  private updateTimeSlotsData() {
    console.count('updateTimeSlotsData');
    const week = [...StorageService.selectedWeek];

    this.timeSlotElements.forEach(async (timeSlotElement) => {
      timeSlotElement.innerHTML = '';

      const [
        dayNumber,
        hour,
      ]: number[] = timeSlotElement.dataset
        .slotIndex!.split('-')
        .map((v) => Number(v));

      const dayTimeValue = week[dayNumber]?.setHours(hour, 0, 0);

      timeSlotElement.dataset.dateTime = new Date(dayTimeValue).toString();

      const slotEvents: CalendarEventRecord[] = await StorageService.getEventsBySlotIndex(
        timeSlotElement?.dataset?.slotIndex as string,
      );

      if (slotEvents?.length) {
        slotEvents.forEach((slotEvent) => {
          const calendarEvent = new CalendarEvent(slotEvent, timeSlotElement);
          calendarEvent.render();
        });
      }
    });
  }

  public render() {
    this.updateTimeSlotsData();
  }
}
