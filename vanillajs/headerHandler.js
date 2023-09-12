// const createHeaderDateTextContent = (selectedDate) => {
//   const header = document.querySelector("#header-menu");
//   const currentDateElement = document.createElement("li");
//   const today = selectedDate ?? new Date();
//   const internationalization = new Intl.DateTimeFormat("en-us", {
//     dateStyle: "full",
//   });
//   currentDateElement.appendChild(
//     document.createTextNode(internationalization.format(today))
//   );
//   header.appendChild(currentDateElement);
// };

const styleHeaderDreadfulWay = () => {
  const aside = document.getElementsByTagName("aside");
  console.log(aside);
};
styleHeaderDreadfulWay();
const navigateWeeks = (target) => {
  const index = sessionStorageService().getWeekIndex();
  const weekFactor = { current: 0, next: 7, prev: -7 }[target];
  if (!weekFactor) return;
  const today = new Date();
  const weekOffset = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + weekFactor * Math.abs(index)
  );

  getWeekDateByDayMap(weekOffset);
  return weekOffset;
};

const updateWeekIndex = (index) => {
  sessionStorageService().setWeekIndex(
    sessionStorageService().getWeekIndex() + index
  );
};

document.querySelector("#prev-week").addEventListener("click", function () {
  // !why to pass param if the data is in memory.
  updateWeekIndex(-1);
  const weekOffset = navigateWeeks("prev");
  createWeekView(weekOffset);
});

document.querySelector("#next-week").addEventListener("click", function () {
  // !why to pass param if the data is in memory.
  updateWeekIndex(1);
  const weekOffset = navigateWeeks("next");
  createWeekView(weekOffset);
});

document.querySelector("#ongoing-week").addEventListener("click", function () {
  // !bad naming current !== ongoing
  sessionStorageService().setWeekIndex(0);
  const weekOffset = navigateWeeks("current");
  createWeekView(weekOffset);
});

// createHeaderDateTextContent(null);
