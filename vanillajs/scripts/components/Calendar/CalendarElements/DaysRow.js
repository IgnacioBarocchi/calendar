const DaysRow = (date) => {
  const daysRows = document.querySelector("#days-row");
  if (!date) {
    date = new Date();
  }

  const isOngoingWeek = new Date().toDateString() === date.toDateString();

  const weekMap = getWeekDateByDayMap(date);
  DAYS_ABBREVIATIONS.forEach((day, i) => {
    const dateNumber = weekMap.get(String(i));
    const tableData = document.createElement("td");
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("days-of-week");

    const dayName = document.createElement("span");
    const dayNumber = document.createElement("span");
    dayName.appendChild(document.createTextNode(day.toUpperCase()));
    dayNumber.appendChild(document.createTextNode(dateNumber));

    dayContainer.appendChild(dayName);
    dayContainer.appendChild(dayNumber);
    tableData.appendChild(dayContainer);
    daysRows.appendChild(tableData);

    if (isOngoingWeek && date.getDate() === Number(dateNumber)) {
      dayNumber.classList.add("today-day");
    }
  });
};
