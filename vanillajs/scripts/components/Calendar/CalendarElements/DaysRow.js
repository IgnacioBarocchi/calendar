const mapDaysFrom =
  (weekMap, isOngoingWeek, date) => (dayTextValue, dayNumericValue) => {
    const dateNumericValue = weekMap.get(String(dayNumericValue));
    const dayNumericElementClassName =
      isOngoingWeek && date.getDate() === Number(dateNumericValue)
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
  const weekMap = getWeekDateByDayMap(date);

  const daysRows = document.querySelector("#days-row");
  const isOngoingWeek = new Date().toDateString() === date.toDateString();
  const mapCallback = mapDaysFrom(weekMap, isOngoingWeek, date);
  appendElements(DAYS_ABBREVIATIONS.map(mapCallback), daysRows);
};
