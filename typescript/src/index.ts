import CalendarBody from './components/CalendarBody/CalendarBody';
import CalendarHeaderRow from './components/CalendarHeaderRow/CalendarHeaderRow';
import CalendarMonth from './components/CalendarMonth/CalendarMonth';
import ClockHand from './components/ClockHand/ClockHand';
import NavigationControls from './controls/NavigationControls';

const today = new Date();
const calendaeHeaderRowComponent = CalendarHeaderRow.getInstance();
const calendarBodyComponent = CalendarBody.getInstance();
const calendarMonthComponent = new CalendarMonth();

const components = [
  calendaeHeaderRowComponent,
  calendarBodyComponent,
  calendarMonthComponent,
];

window.addEventListener('DOMContentLoaded', () => {
  components.forEach((component) => component.render());

  const navigationControls = new NavigationControls(
    calendaeHeaderRowComponent,
    calendarBodyComponent,
    calendarMonthComponent,
  );

  navigationControls.navigateWithNavbar();

  const ClockHandComponent = new ClockHand(
    document.querySelector(
      `[data-slot-index="${today.getDay()}-${today.getHours()}"]`,
    ) as HTMLElement,
  );

  ClockHandComponent.startTick();

  // todo: attach scroll during first iteration
  const earliestEventOfTheWeek = document.querySelector(
    '[class^=time-slot-event]',
  );
  earliestEventOfTheWeek?.scrollIntoView();
});

// import StorageService from './StorageService/StorageService';
// (async function () {
//   console.log('in index', await StorageService.getEventsOfTheWeekBySlotIndex());
// })();
