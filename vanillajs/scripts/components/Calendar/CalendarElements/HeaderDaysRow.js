import { DAYS_ABBREVIATIONS } from "../../../constants/index.js";
import appendElements from "../../../lib/appendElements.js";
import { createElement } from "../../../lib/createElement.js";
import { getWeekFrom } from "../../../helpers/calendarHelper.js";
const weekToDayRow = (dateString, i) => {
  const date = new Date(dateString);
  const dateNumericValue = date.getDate();
  const dayNumericElementClassName =
    new Date().toDateString() === date.toDateString() ? "today-day" : "";

  //* the week array is sorted, so we can use the iterator
  const innerHTML = `
      <div class="days-of-week">
          <span>${DAYS_ABBREVIATIONS[i]}</span>
          <span class="${dayNumericElementClassName}">${dateNumericValue}</span>
      </div>
  `;

  return createElement("td", { innerHTML });
};

const HeaderDaysRow = (date) => {
  appendElements(
    getWeekFrom(date).map(weekToDayRow),
    document.querySelector("#days-row")
  );
};

export default HeaderDaysRow;

// ! single iteration with map.
/*
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

const HeaderDaysRow = (date) => {
  const HeaderDaysRow = document.querySelector("#days-row");
  appendElements(
    DAYS_ABBREVIATIONS.map(
      mapDaysFrom(
        getWeekDateByDayMap(date),
        new Date().toDateString() === date.toDateString(),
        date
      )
    ),
    HeaderDaysRow
  );
};
*/
