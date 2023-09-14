import { DAYS_ABBREVIATIONS } from "../../constants/index.js";
import appendElements from "../../lib/appendElements.js";
// 7 x 24 + 1 header column + 1 header row
import { createElement2 } from "../../lib/createElement.js";
import { localStorageService } from "../../storage/index.js";
const Storage = localStorageService();

const getGridCell = (text, isHeader) =>
  createElement2(
    `<div class="grid-item ${isHeader ? "header-row" : ""}">
        <span>${text}</span>
    </div>`
  );

const instanceCalendar = () => {
  const grid = document.getElementById("grid");
  appendElements(
    [
      getGridCell("time", true),
      ...DAYS_ABBREVIATIONS.map((day) => getGridCell(day, true)),
    ],
    grid
  );

  [...Array(24).keys()].forEach((hour) => {
    appendElements(
      [...Array(8).keys()].map((day) => {
        const e = getGridCell();
        e.dataset.slotIndex = `${day}-${hour}`;
        e.classList.add("time-slot");
        return e;
      }),
      grid
    );
  });
};

const updateCalendar = (week) => {
  // todo wipe events
  week.forEach((dateTime) => {
    //
    const calendarSingleDayColumn = document.querySelectorAll(
      `[data-slot-index^='${dateTime.getDay()}']`
    );

    calendarSingleDayColumn.forEach((timeSlot) => {
      const thisDayTime = new Date(dateTime).setHours(
        timeSlot.dataset.slotIndex.split("-")[1],
        0,
        0
      );
      timeSlot.dataset.dateTime = new Date(thisDayTime);

      // const calendarEvents = Storage.getEvents();
      // const fromDateTime = new Date(event.startDateTime);
    });
  });
};

export default () => {
  return { instanceCalendar, updateCalendar };
};
