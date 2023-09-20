import EventDetailsModal from '../Modal/EventDetailsModal.ts';
import Renderable from '../../interfaces/Renderable.ts';
import appendElements from '../../lib/appendElements.ts';
import createElement from '../../lib/createElement.ts';

export const CalendarEventRecordStages = {
  upcoming: 'upcoming',
  draft: 'draft',
} as const;

export default class CalendarEvent implements Renderable {
  calendarEvent: CalendarEventRecord;
  timeSlot: HTMLElement;
  calendarEventElement: HTMLElement;

  constructor(calendarEvent: CalendarEventRecord, timeSlot: HTMLElement) {
    this.calendarEvent = calendarEvent;
    this.timeSlot = timeSlot;
  }

  private getEventHoursLong(startDateTime: Date, endDateTime: Date): Number {
    return Math.abs(startDateTime - endDateTime) / 36e5;
  }

  private processEvents() {
    const { stage } = this.calendarEvent || {};

    if (stage === 'draft') {
      this.calendarEventElement.classList.add('draft');
      return this.calendarEventElement;
    }

    this.calendarEventElement.addEventListener(
      'click',
      function (clientEvent: PointerEvent) {
        // alert("event! " + clientEvent);
        clientEvent.stopPropagation();

        EventDetailsModal.open(this.calendarEventElement, [
          clientEvent.clientX,
          clientEvent.clientY,
        ]);
      }.bind(this),
    );

    return this.calendarEventElement;
  }

  render() {
    const {
      stage,
      title,
      startDateTime: startDateTimeString,
      endDateTime: endDateTimeString,
      description,
    } = this.calendarEvent || {};

    const classNameByEventStage = {
      upcoming: 'time-slot-event-upcoming',
      ongoing: 'time-slot-event-ongoing',
      past: 'time-slot-event-past',
      draft: 'time-slot-event-draft',
    }[stage];

    const startDateTime = new Date(startDateTimeString);
    const endDateTime = new Date(endDateTimeString);
    const eventHoursLong = this.getEventHoursLong(startDateTime, endDateTime);

    if (!this.timeSlot) {
      this.timeSlot = document.querySelector(
        `[data-slot-index="${startDateTime.getDay()}-${startDateTime.getHours()}"]`,
      );
    }

    const pixelUnitsOfOneHourSlot = this.timeSlot.offsetHeight;
    const calendarEventOffsetHeight = `${
      pixelUnitsOfOneHourSlot * eventHoursLong
    }`;

    this.calendarEventElement = createElement(
      `
        <div class="${classNameByEventStage}" style="height: ${calendarEventOffsetHeight}px; top:${startDateTime.getMinutes()}px" data-calendar-event='${JSON.stringify(
        this.calendarEvent,
      )}'>
            <h3>${title}</h3>
            <div>${startDateTime.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })} - ${endDateTime.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}</div>
      ${description ? `<div>${description}</div>` : ''}
        </div>
      `,
    );

    appendElements([this.processEvents()], this.timeSlot);

    return this.calendarEventElement;
  }
}

export interface CalendarEventRecord {
  stage: keyof typeof CalendarEventRecordStages;
  title: string;
  startDateTime: Date;
  endDateTime: Date;
  description?: string;
}
