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
    // debe venir de new Date();
    localStorage.setItem("events", 1 + "");
  }
};

const localStorageService = () => {
  const events = JSON.parse(localStorage.getItem("events"));
  const getEvents = () => events;

  const setEvent = (event) => {
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
  };

  return [getEvents, setEvent];
};

const navigateMonths = () => {};
