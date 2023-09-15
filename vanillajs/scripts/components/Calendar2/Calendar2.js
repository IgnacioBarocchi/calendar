import { DAYS_ABBREVIATIONS, TIME_ZONE_OFFSET } from "../../constants/index.js";

import CreateEventModal from "../CreateEventModal/index.js";
import TimeSlotEvent from "../TimeSlotEvent/index.js";
import appendElements from "../../lib/appendElements.js";
import { createElement2 } from "../../lib/createElement.js";
import { localStorageService } from "../../storage/index.js";

const Storage = localStorageService();

function openModal(event) {
  const dialog = document.querySelector("#event-modal").open;
  if (dialog.open) {
    dialog.close();
    return;
  }
  CreateEventModal(this.dataset.dateTime, [event.clientX, event.clientY]);
}

const getGridCell = (text, isHeader) =>
  createElement2(
    `<div class="grid-item ${isHeader ? "header-row" : "time-slot"}">
        ${
          text &&
          `<div class="header-text-container">
            <span class="date-name">${text}</span>
            <span class="date-number"></span>
          </div>`
        }
    </div>`
  );

const instanceCalendar = () => {
  const grid = document.getElementById("grid");
  appendElements(
    [
      getGridCell(TIME_ZONE_OFFSET, true),
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
          timeSlot.addEventListener("click", openModal);
          return timeSlot;
        }),
      ],
      grid
    );
  });
};

const updateCalendar = (week) => {
  const calendarDaysHeader = document.querySelectorAll(".header-row");
  week.forEach((dateTime, i) => {
    //* update header
    const calendarDaysHeaderCell = calendarDaysHeader[i + 1];
    const dateNumber = calendarDaysHeaderCell.querySelector(".date-number");
    dateNumber.textContent = dateTime.getDate();

    if (dateTime.toDateString() === new Date().toDateString()) {
      dateNumber.classList.add("today-highlight");
    }

    // * update cells
    const calendarSingleDayColumn = document.querySelectorAll(
      `[data-slot-index^='${dateTime.getDay()}']`
    );

    calendarSingleDayColumn.forEach((timeSlot) => {
      //* Wipe events
      timeSlot.innerHTML = "";
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
