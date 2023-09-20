"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testModule_1 = require("./testModule");
alert(testModule_1.aa);
// import CalendarBody from "./components/CalendarBody/CalendarBody";
// import CalendarHeaderRow from "./components/CalendarHeaderRow/CalendarHeaderRow";
// import CalendarMonth from "./components/CalendarMonth/CalendarMonth";
// import ClockHand from "./components/ClockHand/ClockHand";
// import NavigationControls from "./controls/NavigationControls";
// import StorageService from "./StorageService/StorageService";
// const today = new Date();
// const calendaeHeaderRowComponent = new CalendarHeaderRow(StorageService);
// const calendarBodyComponent = new CalendarBody(StorageService);
// const calendarMonthComponent = new CalendarMonth(StorageService);
// const components = [
//   calendaeHeaderRowComponent,
//   calendarBodyComponent,
//   calendarMonthComponent,
// ];
// window.addEventListener("DOMContentLoaded", () => {
//   components.forEach((component) => component.render());
//   const navigationControls = new NavigationControls(
//     StorageService,
//     calendaeHeaderRowComponent,
//     calendarBodyComponent,
//     calendarMonthComponent
//   );
//   navigationControls.navigateWithNavbar();
//   const ClockHandComponent = new ClockHand(
//     document.querySelector(
//       `[data-slot-index="${today.getDay()}-${today.getHours()}"]`
//     )
//   );
//   ClockHandComponent.startTick();
//   // todo: attach scroll during first iteration
//   const earliestEventOfTheWeek = document.querySelector(
//     "[class^=time-slot-event]"
//   );
//   earliestEventOfTheWeek?.scrollIntoView();
// });
