import { DAYS_ABBREVIATIONS } from "../../constants/index.js";
import TimeSlotEvent from "../TimeSlotEvent/index.js";
import appendElements from "../../lib/appendElements.js";
import { createElement2 } from "../../lib/createElement.js";
import { localStorageService } from "../../storage/index.js";

const Storage = localStorageService();

const timezoneOffset = { 480: "UTC-8", 0: "UTC", 180: "UTC+3" }[
  Math.abs(new Date().getTimezoneOffset())
];

const getGridCell = (text, isHeader) =>
  createElement2(
    `<div class="grid-item ${isHeader ? "header-row" : "time-slot"}">
        ${
          text &&
          `<div class="header-text-container">
            <span class="date-name">${text}</span>
            <span class="date-number">0</span>
          </div>`
        }
    </div>`
  );

const instanceCalendar = () => {
  const grid = document.getElementById("grid");
  appendElements(
    [
      getGridCell(timezoneOffset, true),
      ...DAYS_ABBREVIATIONS.map((day) => getGridCell(day, true)),
    ],
    grid
  );

  // * 7 x 24 + 1 header column + 1 header row
  [...Array(24).keys()].forEach((hour) => {
    appendElements(
      [
        createElement2(
          `<div class="grid-item header-col">
                <div class="header-text-container">
                  <span>${hour}</span>
                </div>
          </div>`
        ),
        ...[...Array(7).keys()].map((day) => {
          const timeSlot = getGridCell();
          timeSlot.dataset.slotIndex = `${day}-${hour}`;
          return timeSlot;
        }),
      ],
      grid
    );
  });
};

const updateCalendar = (week) => {
  debugger;
  const calendarDaysHeader = document.querySelectorAll(".header-row");
  week.forEach((dateTime, i) => {
    //* update header
    const dateNumber = calendarDaysHeader[i + 1].querySelector(".date-number");
    dateNumber.textContent = dateTime.getDate();

    // * update cells
    const calendarSingleDayColumn = document.querySelectorAll(
      `[data-slot-index^='${dateTime.getDay()}']`
    );

    calendarSingleDayColumn.forEach((timeSlot) => {
      timeSlot.innerHTML = ""; //wipe events
      const thisDayTime = new Date(dateTime).setHours(
        timeSlot.dataset.slotIndex.split("-")[1],
        0,
        0
      );
      timeSlot.dataset.dateTime = new Date(thisDayTime);

      const calendarEvents = Storage.getEventsBySlotIndex(
        timeSlot.dataset.slotIndex
      );

      if (calendarEvents && calendarEvents.length) {
        calendarEvents.forEach((event) => {
          TimeSlotEvent(event, timeSlot);
        });
      }
    });
  });
};

export default () => {
  return { instanceCalendar, updateCalendar };
};
