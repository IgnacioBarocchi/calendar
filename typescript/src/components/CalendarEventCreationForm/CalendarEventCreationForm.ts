import CalendarEvent, {
  CalendarEventRecord,
} from '../CalendarEvent/CalendarEvent.ts';

import EventCreationModal from '../Modal/EventCreationModal.ts';
import StorageService from '../../StorageService/StorageService.ts';
import formatDateToDateInputValue from '../../lib/formatDateToDateInputValue.ts';

class CalendarEventCreationForm {
  private calendarEventCreationFormElement = document.querySelector(
    '#event-creation-form',
  ) as HTMLFormElement;

  private constructor() {
    const createEventButton = this.calendarEventCreationFormElement.querySelector(
      '#create-event-button',
    );

    if (!createEventButton) return;

    createEventButton.addEventListener(
      'click',
      this.createEventRecord.bind(this),
    );
  }

  autoFillDates(startDateTime: Date) {
    const startDateTimeField: HTMLInputElement = document.querySelector(
      '#start-datetime',
    )!;

    startDateTimeField.value = formatDateToDateInputValue(startDateTime);
    const endDateTimeField: HTMLInputElement = document.querySelector(
      '#end-datetime',
    )!;

    endDateTimeField.value = formatDateToDateInputValue(
      new Date(startDateTime).setMinutes(30),
    );
  }

  private eventIsValid(
    title: CalendarEventRecord['title'],
    startDateTime: CalendarEventRecord['startDateTime'],
    endDateTime: CalendarEventRecord['endDateTime'],
  ) {
    const requiredFieldsAreEmpty = !title || !startDateTime || !endDateTime;
    const wrongDateFormat =
      !(startDateTime instanceof Date) || !(endDateTime instanceof Date);

    if (requiredFieldsAreEmpty) throw new Error('Missing required fields');
    if (wrongDateFormat) throw new Error('Wrong date format');
    if (
      formatDateToDateInputValue(startDateTime) ===
      formatDateToDateInputValue(endDateTime)
    )
      throw new Error('The start date cannot be equal to the end date');
    if (startDateTime > endDateTime)
      throw new Error('The start date cannot be greater than the end date');

    return true;
  }

  private createEventRecord() {
    const titleElement: HTMLInputElement = document.querySelector(
      '#event-title',
    )!;

    const startDateTimeElement: HTMLInputElement = document.querySelector(
      '#start-datetime',
    )!;

    const endDateTimeElement: HTMLInputElement = document.querySelector(
      '#end-datetime',
    )!;

    const descriptionElement: HTMLTextAreaElement = document.querySelector(
      '#event-description',
    )!;

    const title = titleElement.value;

    const startDateTime = new Date(startDateTimeElement.value);

    const endDateTime = new Date(endDateTimeElement.value);

    const description = descriptionElement.value;

    if (this.eventIsValid(title, startDateTime, endDateTime)) {
      const eventRecord: CalendarEventRecord = {
        id: 'tmp',
        title,
        startDateTime,
        endDateTime,
        description,
        stage: 'upcoming',
      };

      const timeSlotEvent = new CalendarEvent(eventRecord);
      timeSlotEvent.render();
      EventCreationModal.close();
      StorageService.saveEvent(eventRecord);
    }
  }

  private static instance: CalendarEventCreationForm;

  public static getInstance(): CalendarEventCreationForm {
    if (!this.instance) {
      this.instance = new CalendarEventCreationForm();
    }
    return this.instance;
  }
}

export default CalendarEventCreationForm.getInstance();
