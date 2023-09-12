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
