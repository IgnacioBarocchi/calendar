const mapDaysFrom =
  (weekMap, isOngoingWeek, date) => (dayTextValue, dayNumericValue) => {
    const dateNumericValue = weekMap.get(String(dayNumericValue));
    const tableDataElement = createElement("td");
    const dayContainer = createElement("div", { className: "days-of-week" });

    const dayTextValueContainerElement = createElement("span");
    const dayNumberContainerElement = createElement("span");

    dayTextValueContainerElement.appendChild(
      document.createTextNode(dayTextValue.toUpperCase())
    );

    dayNumberContainerElement.appendChild(
      document.createTextNode(dateNumericValue)
    );

    [dayTextValueContainerElement, dayNumberContainerElement].map((c) =>
      dayContainer.appendChild(c)
    );

    tableDataElement.appendChild(dayContainer);

    if (isOngoingWeek && date.getDate() === Number(dateNumericValue)) {
      dayNumberContainerElement.classList.add("today-day");
    }
    return tableDataElement;
  };

const DaysRow = (date) => {
  const daysRows = document.querySelector("#days-row");
  const isOngoingWeek = new Date().toDateString() === date.toDateString();

  return DAYS_ABBREVIATIONS.map(
    mapDaysFrom(getWeekDateByDayMap(date), isOngoingWeek, date)
  ).map((tableDataElement) => {
    daysRows.appendChild(tableDataElement);
    return tableDataElement;
  });
};
