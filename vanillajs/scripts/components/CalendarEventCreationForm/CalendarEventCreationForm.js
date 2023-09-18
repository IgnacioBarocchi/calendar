import formatDateToDateInputValue from "../../lib/formatDateToDateInputValue.js";
export class CalendarEventCreationForm {
  calendarEventCreationFormElement = document.querySelector(
    "#event-creation-form"
  );
  // el modal lo va a usar cuando se le agregue el event listener
  autoFillDates(startDateTime) {
    const startDateTimeField = document.querySelector("#start-datetime");
    startDateTimeField.value = formatDateToDateInputValue(startDateTime);
    const endDateTimeField = document.querySelector("#end-datetime");

    endDateTimeField.value = formatDateToDateInputValue(
      new Date(startDateTime).setMinutes(30)
    );
  }

  _eventIsValid() {
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
      TimeSlotEvent(eventRecord);
      localStorageService().addEvent(eventRecord);
      document.querySelector("#event-modal").close();
    }
  }

  render() {}
}

export default new CalendarEventCreationForm();
