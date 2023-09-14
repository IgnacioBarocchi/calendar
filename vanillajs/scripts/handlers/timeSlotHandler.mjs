import EventModal from "../components/EventModal/index.js";
import TimeSlotEvent from "../components/TimeSlotEvent/index.js";

const getDraftEventFrom = (timeSlotElement) => {
  const slotDateTime = new Date(timeSlotElement.dataset.dayTime);
  const startTime = new Date(timeSlotElement.dataset.dayTime);
  const endTime = new Date(slotDateTime.setMinutes(30));

  return {
    stage: "draft",
    title: `(no title), ${startTime.getHours()}`,
    startTime,
    endTime,
  };
};

document.querySelectorAll("[data-day-time]").forEach((element) => {
  element.addEventListener("click", function (clientEvent) {
    // ! check if draft.
    const draftEvent = getDraftEventFrom(this);
    TimeSlotEvent(draftEvent, this);
    EventModal(draftEvent, [clientEvent.clientY, clientEvent.clientX]);
  });
});
