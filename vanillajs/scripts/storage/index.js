// rename file to storage
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
  }
};

const localStorageService = () => {
  const events = JSON.parse(localStorage.getItem("events"));
  const getEvents = () => events;

  const setEvent = (event) => {
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
  };

  const getWeekDatesCollection = () => {
    return JSON.parse(localStorage.getItem("weekDates"));
  };

  const getWeekDatesByWeekIndex = (index) => {
    return getWeekDatesCollection()[index];
  };

  const saveWeekDates = (week) => {
    const updatedCollection = {
      [sessionStorageService().getWeekIndex()]: week,
      ...getWeekDatesCollection(),
    };
    localStorage.setItem("weekDates", JSON.stringify(updatedCollection));
  };

  return { getEvents, setEvent, getWeekDatesByWeekIndex, saveWeekDates };
};

window.addEventListener("beforeunload", () => {
  sessionStorage.clear();
});

const sessionStorageService = () => {
  getWeekIndex = () => {
    return Number(sessionStorage.getItem("weekIndex"));
  };

  setWeekIndex = (weekIndex) => {
    sessionStorage.setItem("weekIndex", weekIndex + "");
  };

  return { getWeekIndex, setWeekIndex };
};
