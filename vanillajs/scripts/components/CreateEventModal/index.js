import TimeSlotEvent from "../TimeSlotEvent/index.js";
import formatDateToDateInputValue from "../../lib/formatDateToDateInputValue.js";
import { localStorageService } from "../../storage/index.js";
import { render } from "../../helpers/modalHelper.js";
const autoFillDates = (startDateTime) => {
  const startDateTimeField = document.querySelector("#start-datetime");
  startDateTimeField.value = formatDateToDateInputValue(startDateTime);
  const endDateTimeField = document.querySelector("#end-datetime");

  endDateTimeField.value = formatDateToDateInputValue(
    new Date(startDateTime).setMinutes(30)
  );
};

const eventIsValid = (title, startDateTime, endDateTime) => {
  const requiredFieldsAreEmpty = !title || !startDateTime || !endDateTime;
  const wrongDateFormat =
    !startDateTime instanceof Date || !endDateTime instanceof Date;

  if (requiredFieldsAreEmpty) throw new Error("Missing required fields");
  if (wrongDateFormat) throw new Error("Wrong date format");
  // ! doesn't work if (startDateTime.toDateString() === endDateTime.toDateString())
  if (
    formatDateToDateInputValue(startDateTime) ===
    formatDateToDateInputValue(endDateTime)
  )
    throw new Error("The start date cannot be equal to the end date");
  if (startDateTime > endDateTime)
    throw new Error("The start date cannot be greater than end date");

  return true;
};

const CreateEventModal = (startTime, position) => {
  render(position, document.querySelector("#event-modal"));
  autoFillDates(startTime);
};

const createEventRecord = () => {
  const title = document.querySelector("#event-title").value;
  debugger;
  const startDateTime = new Date(
    document.querySelector("#start-datetime").value
  );

  const endDateTime = new Date(document.querySelector("#end-datetime").value);
  const description = document.querySelector("#event-description").value;

  if (eventIsValid(title, startDateTime, endDateTime)) {
    const eventRecord = {
      title,
      startDateTime,
      endDateTime,
      description,
      stage: "upcoming",
      // ! the problem is that updating them in real time is quite complicated
      // todo add stage upcoming | ongoing | past depending on dates!
    };
    // document query selector all draft events and remove
    TimeSlotEvent(eventRecord);
    localStorageService().addEvent(eventRecord);
    document.querySelector("#event-modal").close();
  }
};

document
  .querySelector("#create-event-button")
  .addEventListener("click", createEventRecord);

export default CreateEventModal;
