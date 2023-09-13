document
  .querySelector("#aside-create-event-button")
  .addEventListener("click", () => {
    // !horrible
    TimeSlotEvent(
      {
        stage: "draft",
        title: `(no title), ${new Date().getHours()}`,
        startTime: new Date(),
        endTime: new Date(new Date().setMinutes(30)),
      },
      this
    );

    EventModal(draftEvent, [clientEvent.clientY, clientEvent.clientX]);
  });
