import CalendarBody from "./components/CalendarBody/CalendarBody.js";
import CalendarHeaderRow from "./components/CalendarHeaderRow/CalendarHeaderRow.js";
import ClockHand from "./components/ClockHand/ClockHand.js";
import NavigationControls from "./controls/NavigationControls.js";
import StorageService from "./StorageService/StorageService.js";
import CalendarMonth from "./components/CalendarMonth/CalendarMonth.js";

const today = new Date();
const storageService = new StorageService();
const calendaeHeaderRowComponent = new CalendarHeaderRow(storageService);
const calendarBodyComponent = new CalendarBody(storageService);
const calendarMonthComponent = new CalendarMonth(storageService);

const components = [
  calendaeHeaderRowComponent,
  calendarBodyComponent,
  calendarMonthComponent,
];

window.addEventListener("DOMContentLoaded", () => {
  components.forEach((component) => component.render());

  const navigationControls = new NavigationControls(
    storageService,
    calendaeHeaderRowComponent,
    calendarBodyComponent,
    calendarMonthComponent
  );

  navigationControls.navigateWithNavbar();

  const ClockHandComponent = new ClockHand(
    document.querySelector(
      `[data-slot-index="${today.getDay()}-${today.getHours()}"]`
    )
  );

  ClockHandComponent.startTick();
});
