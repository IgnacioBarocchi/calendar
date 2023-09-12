const mapDaysFrom =
  (weekMap, todayIsVisible, date) => (dayTextValue, dayNumericValue) => {
    const dateNumericValue = weekMap.get(String(dayNumericValue));
    const dayNumericElementClassName =
      todayIsVisible && date.getDate() === Number(dateNumericValue)
        ? "today-day"
        : "";

    const innerHTML = `
        <div class="days-of-week">
            <span>${dayTextValue.toUpperCase()}</span>
            <span class="${dayNumericElementClassName}">${dateNumericValue}</span>
        </div>
    `;

    return createElement("td", { innerHTML });
  };

const DaysRow = (date) => {
  const daysRows = document.querySelector("#days-row");
  appendElements(
    DAYS_ABBREVIATIONS.map(
      mapDaysFrom(
        getWeekDateByDayMap(date),
        new Date().toDateString() === date.toDateString(),
        date
      )
    ),
    daysRows
  );
};
