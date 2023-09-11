/*
  storage interface:
  {
    events: string[],
    currentWeek: number
  }
*/

const createStorage = () => {
  if (!localStorage.getItem("events")) {
    localStorage.setItem("events", [].toString());
    localStorage.setItem("weekNavigationIndex", 0 + "");
  }
};

const localStorageService = () => {
  const events = JSON.parse(localStorage.getItem("events"));
  const getEvents = () => events;

  const setEvent = (event) => {
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
  };

  getWeekIndex = () => {
    return Number(localStorage.getItem("weekIndex"));
  };

  setWeekIndex = (weekIndex) => {
    localStorage.setItem("weekIndex", weekIndex + "");
  };

  return { getEvents, setEvent, getWeekIndex, setWeekIndex };
};
