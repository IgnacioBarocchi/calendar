import CreateEventModal from "../components/CreateEventModal/index.js";
import TimeSlotEvent from "../components/TimeSlotEvent/index.js";

document
  .querySelector("#aside-create-event-button")
  .addEventListener("click", () => {
    alert("a");
    const draftEvent = {
      stage: "draft",
      title: `(no title), ${new Date().getHours()}`,
      startDateTime: new Date(),
      endDateTime: new Date(new Date().setMinutes(30)),
    };

    TimeSlotEvent(draftEvent, this);

    CreateEventModal(draftEvent, [clientEvent.clientY, clientEvent.clientX]);
  });
