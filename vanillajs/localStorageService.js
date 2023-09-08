const localStorageService = () => {
  const events = JSON.parse(localStorage.getItem("events"));
  const getEvents = () => events;

  const setEvent = (event) => {
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
  };

  return [getEvents, setEvent];
};
