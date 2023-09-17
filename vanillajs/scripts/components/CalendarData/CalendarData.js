import { DAYS_ABBREVIATIONS, TIME_ZONE_OFFSET } from "../../constants/index.js";

import CalendarHeader from "./CalendarElements/CalendarHeader.js";
import CreateEventModal from "../CreateEventModal/index.js";
import TimeSlotEvent from "../TimeSlotEvent/index.js";
import appendElements from "../../lib/appendElements.js";
import { createElement2 } from "../../lib/createElement.js";
import getWeekFrom from "./CalendarElements/CalendarHeader";
import { localStorageService } from "../../storage/index.js";
import mapRange from "../../lib/mapRange.js";

class Calendar {
  parentElement = document.getElementById("grid");
  week = getWeekFrom(new Date());
  weekIndex = 0;

  constructor() {
    this.Storage = localStorageService();
  }

  getHeader() {
    const timeOffsetHeaderElement = new CalendarHeader(0, 0, true);
    mapRange(0, 7, (day) => {});
    //   hacer single tone y con esto puedo tener los headers sin seleccionarlos.

    const headerElements = x;
  }

  openModal(event) {
    const dialog = document.querySelector("#event-modal").open;
    if (dialog.open) {
      dialog.close();
      return;
    }
    CreateEventModal(this.dataset.dateTime, [event.clientX, event.clientY]);
  }

  getGridCell(text, isHeader) {
    return createElement2(
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
  }

  /*private*/ updateCalendarDataFor(week) {}

  renderNextWeek() {
    this.week = [];
    this.updateCalendarDataFor(this.week);
  }

  renderOngoingWeek() {
    this.week = [];
    this.updateCalendarDataFor(this.week);
  }

  renderPreviousWeek() {
    this.week = [];
    this.updateCalendarDataFor(this.week);
  }
}

export default Calendar;

const c = Calendar();
// btn click
c.renderNextWeek(); // should render header.
// instanceCalendar() {
//     const grid = document.getElementById("grid");
//     appendElements(
//       [
//         this.getGridCell(TIME_ZONE_OFFSET, true),
//         ...DAYS_ABBREVIATIONS.map((day) => this.getGridCell(day, true)),
//       ],
//       grid
//     );

//     mapRange(0, 24, (hour) => {
//       const time = new Date();
//       time.setHours(hour, 0, 0);

//       appendElements(
//         [
//           createElement2(
//             `<div class="grid-item header-col">
//                 <div class="header-text-container">
//                   <span>${time.toLocaleString("en-US", {
//                     hour: "numeric",
//                     hour12: true,
//                   })}</span>
//                 </div>
//             </div>`
//           ),
//           ...mapRange(0, 7, (day) => {
//             const timeSlot = this.getGridCell();
//             timeSlot.dataset.slotIndex = `${day}-${hour}`;
//             timeSlot.addEventListener("click", this.openModal);
//             return timeSlot;
//           }),
//         ],
//         grid
//       );
//     });
//   }

//   updateCalendar(week = this.week) {
//     this.week = week;
//     const calendarDaysHeader = document.querySelectorAll(".header-row");
//     week.forEach((dateTime, i) => {
//       //* update header
//       const calendarDaysHeaderCell = calendarDaysHeader[i + 1];
//       const dateNumber = calendarDaysHeaderCell.querySelector(".date-number");
//       dateNumber.textContent = dateTime.getDate();

//       if (dateTime.toDateString() === new Date().toDateString()) {
//         dateNumber.classList.add("today-highlight");
//       }

//       const calendarSingleDayColumn = document.querySelectorAll(
//         `[data-slot-index^='${dateTime.getDay()}']`
//       );

//       calendarSingleDayColumn.forEach((timeSlot) => {
//         //* Wipe events
//         timeSlot.innerHTML = "";
//         const thisDayTime = new Date(dateTime).setHours(
//           timeSlot.dataset.slotIndex.split("-")[1],
//           0,
//           0
//         );

//         timeSlot.dataset.dateTime = new Date(thisDayTime);

//         const calendarEvents = this.Storage.getEventsBySlotIndex(
//           timeSlot.dataset.slotIndex
//         );

//         if (calendarEvents && calendarEvents.length) {
//           calendarEvents.forEach((event) => {
//             TimeSlotEvent(event, timeSlot);
//           });
//         }
//       });
//     });
//   }
