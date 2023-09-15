window.addEventListener("beforeunload", () => {
  sessionStorage.clear();
});

const localStorageService = () => {
  const events = JSON.parse(localStorage.getItem("events")) || {};
  const getEvents = () => events;

  const addEvent = (event) => {
    const slotIndex = `${event.startDateTime.getDay()}-${event.startDateTime.getHours()}`;
    const eventsOfTheSlot = events[slotIndex] || [];
    // ! replace by seed random | nano id npm module
    event.id = String(
      Object.values(events).flat().length +
        Math.random() * 10000 +
        new Date().getSeconds()
    ).replace(".", "");

    eventsOfTheSlot.push(event);

    localStorage.setItem(
      "events",
      JSON.stringify({ ...events, [slotIndex]: eventsOfTheSlot })
    );
  };

  const getEventsBySlotIndex = (slotIndex) => {
    const eventsOfTheSlot = events[slotIndex];
    if (!eventsOfTheSlot || !eventsOfTheSlot.length) return [];

    const timeSlotDayTime = new Date(
      document.querySelector(
        `[data-slot-index="${slotIndex}"]`
      ).dataset.dateTime
    );

    return eventsOfTheSlot.filter((event) => {
      const eventDate = new Date(event.startDateTime);
      return (
        eventDate.getHours() === timeSlotDayTime.getHours() &&
        eventDate.getDate() === timeSlotDayTime.getDate()
      );
    });
  };

  const deleteEventByObjectIds = (targetId) => {
    localStorage.setItem(
      "events",
      JSON.stringify(
        Object.fromEntries(
          Object.entries(events).map(([key, itsEvents]) => {
            return [key, itsEvents.filter((event) => event.id !== targetId)];
          })
        )
      )
    );
  };

  return { getEvents, addEvent, getEventsBySlotIndex, deleteEventByObjectIds };
};

const sessionStorageService = () => {
  const getWeekIndex = () => {
    return Number(sessionStorage.getItem("weekIndex"));
  };

  const setWeekIndex = (weekIndex) => {
    sessionStorage.setItem("weekIndex", weekIndex + "");
  };

  const getWeekDatesCollection = () => {
    return JSON.parse(sessionStorage.getItem("weekDates"));
  };

  const getWeekDatesByWeekIndex = (index) => {
    if (!Array.isArray(getWeekDatesCollection())) return null;
    return getWeekDatesCollection()[index];
  };

  const saveWeekDates = (week) => {
    const updatedCollection = {
      [sessionStorageService().getWeekIndex()]: week,
      ...getWeekDatesCollection(),
    };
    sessionStorage.setItem("weekDates", JSON.stringify(updatedCollection));
  };

  return { getWeekIndex, setWeekIndex, getWeekDatesByWeekIndex, saveWeekDates };
};

export { sessionStorageService, localStorageService };
