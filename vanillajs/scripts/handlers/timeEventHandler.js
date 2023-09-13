const createEventRecord = () => {
  const title = document.querySelector("#event-title").value;
  const startDateTime = new Date(
    document.querySelector("#start-datetime").value
  );
  const endDateTime = new Date(document.querySelector("#end-datetime").value);
  const description = document.querySelector("#event-description").value;

  const requiredFieldsAreEmpty = !title || !startDateTime || !endDateTime;
  const wrongDateFormat =
    !startDateTime instanceof Date || !endDateTime instanceof Date;

  console.log(startDateTime.toDateString());
  console.log(endDateTime.toDateString());
  // !Add error messages to constants file
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

  localStorageService().addEvent({
    title,
    startDateTime,
    endDateTime,
    description,
    // todo add stage upcoming | ongoing | past depending on dates!
    //? parent time slot ?
    //? time slot metadata ?
  });

  document.querySelector("#event-modal").open = false;
};

document
  .querySelector("#create-event-button")
  .addEventListener("click", createEventRecord);
