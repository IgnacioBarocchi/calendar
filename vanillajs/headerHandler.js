const createHeaderDateTextContent = (selectedDate) => {
  const header = document.querySelector("#header-menu");
  const currentDateElement = document.createElement("li");
  const today = selectedDate ?? new Date();
  const internationalization = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  });
  currentDateElement.appendChild(
    document.createTextNode(internationalization.format(today))
  );
  header.appendChild(currentDateElement);
};

const navigateWeeks = (target, index = 0) => {
  const weekFactor = { current: 0, next: 7, prev: -7 }[target];
  if (!weekFactor) return;
  const today = new Date();
  const nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + weekFactor * Math.abs(index)
  );

  console.log(nextweek);
  return nextweek;
};

const updateWeekIndex = (index) => {
  localStorageService().setWeekIndex(
    localStorageService().getWeekIndex() + index
  );
};

const debugWeekIndex = () => {
  document.querySelector("#debug").textContent =
    localStorageService().getWeekIndex();
};

document.querySelector("#prev-week").addEventListener("click", function () {
  // !why to pass param if the data is in memory.
  updateWeekIndex(-1);
  navigateWeeks("prev", localStorageService().getWeekIndex());
  debugWeekIndex();
});

document.querySelector("#next-week").addEventListener("click", function () {
  // !why to pass param if the data is in memory.
  updateWeekIndex(1);
  navigateWeeks("next", localStorageService().getWeekIndex());
  debugWeekIndex();
});

document.querySelector("#ongoing-week").addEventListener("click", function () {
  // !bad naming current !== ongoing
  localStorageService().setWeekIndex(0);
  navigateWeeks("current", localStorageService().getWeekIndex());
  debugWeekIndex();
});

createHeaderDateTextContent(null);
