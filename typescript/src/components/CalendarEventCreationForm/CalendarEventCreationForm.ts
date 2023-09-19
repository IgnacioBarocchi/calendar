import ModalComponent from "../Modal/Modal.ts";
import TimeSlotEvent from "../CalendarEvent/CalendarEvent.ts";
import formatDateToDateInputValue from "../../lib/formatDateToDateInputValue.ts";

export default class CalendarEventCreationForm {
  storage;
  calendarEventCreationFormElement = document.querySelector(
    "#event-creation-form"
  );

  constructor(storage) {
    this.storage = storage;

    this.calendarEventCreationFormElement
      .querySelector("#create-event-button")
      .addEventListener("click", this.createEventRecord.bind(this));
  }

  autoFillDates(startDateTime) {
    const startDateTimeField = document.querySelector("#start-datetime");
    startDateTimeField.value = formatDateToDateInputValue(startDateTime);
    const endDateTimeField = document.querySelector("#end-datetime");

    endDateTimeField.value = formatDateToDateInputValue(
      new Date(startDateTime).setMinutes(30)
    );
  }

  _eventIsValid(title, startDateTime, endDateTime) {
    const requiredFieldsAreEmpty = !title || !startDateTime || !endDateTime;
    const wrongDateFormat =
      !startDateTime instanceof Date || !endDateTime instanceof Date;

    if (requiredFieldsAreEmpty) throw new Error("Missing required fields");
    if (wrongDateFormat) throw new Error("Wrong date format");
    if (
      formatDateToDateInputValue(startDateTime) ===
      formatDateToDateInputValue(endDateTime)
    )
      throw new Error("The start date cannot be equal to the end date");
    if (startDateTime > endDateTime)
      throw new Error("The start date cannot be greater than end date");

    return true;
  }

  createEventRecord() {
    // remove draft events.
    const title = document.querySelector("#event-title").value;

    const startDateTime = new Date(
      document.querySelector("#start-datetime").value
    );

    const endDateTime = new Date(document.querySelector("#end-datetime").value);
    const description = document.querySelector("#event-description").value;

    if (this._eventIsValid(title, startDateTime, endDateTime)) {
      const eventRecord = {
        title,
        startDateTime,
        endDateTime,
        description,
        stage: "upcoming",
      };

      const timeSlotEvent = new TimeSlotEvent(eventRecord);
      timeSlotEvent.render();
      ModalComponent.closeCreateEventModal();
      this.storage.saveEvent(eventRecord);
    }
  }
}
