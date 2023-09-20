import CalendarEvent from '../CalendarEvent/CalendarEvent.ts';
import CalendarHeaderColumn from './CalendarDataElements/CalendarHeaderColumn.ts';
import StorageService from '../../StorageService/StorageService.ts';
import TimeSlot from './CalendarDataElements/TimeSlot.ts';
import appendElements from '../../lib/appendElements.ts';

export default class CalendarBody {
  private static instance: CalendarBody;

  private constructor() {
    this.calendarHeaderColumnElements = CalendarHeaderColumn.getElements();
    this.createCalendarBody();
  }

  public static getInstance(): CalendarBody {
    if (!CalendarBody.instance) {
      CalendarBody.instance = new CalendarBody();
    }
    return CalendarBody.instance;
  }

  private calendarHeaderColumnElements;
  private timeSlotElements = [];
  private parentElement = document.getElementById('calendar-body-container');
  private timeSlotInstances = [];

  private createCalendarBody() {
    const bodyElements = [];
    this.calendarHeaderColumnElements.forEach((hourOfDayElement, i) => {
      bodyElements.push(hourOfDayElement);
      StorageService.selectedWeek.forEach((dateTime) => {
        const timeSlot = new TimeSlot(dateTime, i);
        const timeSlotElement = timeSlot.getElement();
        bodyElements.push(timeSlotElement);
        this.timeSlotElements.push(timeSlotElement);
      });
    });

    appendElements(bodyElements, this.parentElement);
  }

  private mapEvents() {}

  private updateTimeSlotsData() {
    const week = [...StorageService.selectedWeek];

    this.timeSlotElements.forEach((timeSlotElement) => {
      timeSlotElement.innerHTML = '';

      const [dayNumber, hour] = timeSlotElement.dataset.slotIndex.split('-');

      const dayTimeValue = week[dayNumber]?.setHours(hour, 0, 0);

      timeSlotElement.dataset.dateTime = new Date(dayTimeValue).toString();

      const slotEvents = StorageService.getEventsBySlotIndex(
        timeSlotElement.dataset.slotIndex,
      );

      if (slotEvents?.length) {
        slotEvents.forEach((slotEvent) => {
          const timeSlotEvent = new CalendarEvent(slotEvent, timeSlotElement);
          timeSlotEvent.render();
        });
      }
    });
  }

  public render() {
    this.updateTimeSlotsData();
  }
}

// import CalendarEvent from '../CalendarEvent/CalendarEvent.ts';
// import CalendarHeaderColumn from './CalendarDataElements/CalendarHeaderColumn.ts';
// import StorageService from '../../StorageService/StorageService.ts';
// import TimeSlot from './CalendarDataElements/TimeSlot.ts';
// import appendElements from '../../lib/appendElements.ts';
// //todo static class extends "Container"

// export default class CalendarBody {
//   calendarHeaderColumnElements;
//   timeSlotElements = [];
//   parentElement = document.getElementById('calendar-body-container');
//   timeSlotInstances = [];

//   constructor() {
//     this.calendarHeaderColumnElements = CalendarHeaderColumn.getElements();
//     this.createCalendarBody();
//   }

//   createCalendarBody() {
//     const bodyElements = [];
//     this.calendarHeaderColumnElements.forEach((hourOfDayElement, i) => {
//       bodyElements.push(hourOfDayElement);
//       StorageService.selectedWeek.forEach((dateTime) => {
//         const timeSlot = new TimeSlot(dateTime, i);
//         const timeSlotElement = timeSlot.getElement();
//         bodyElements.push(timeSlotElement);
//         this.timeSlotElements.push(timeSlotElement);
//       });
//     });

//     appendElements(bodyElements, this.parentElement);
//   }

//   mapEvents() {}

//   updateTimeSlotsData() {
//     const week = [...StorageService.selectedWeek];

//     this.timeSlotElements.forEach((timeSlotElement) => {
//       timeSlotElement.innerHTML = '';

//       const [dayNumber, hour] = timeSlotElement.dataset.slotIndex.split('-');

//       const dayTimeValue = week[dayNumber]?.setHours(hour, 0, 0);

//       timeSlotElement.dataset.dateTime = new Date(dayTimeValue);

//       const slotEvents = StorageService.getEventsBySlotIndex(
//         timeSlotElement.dataset.slotIndex,
//       );

//       if (slotEvents?.length) {
//         slotEvents.forEach((slotEvent) => {
//           const timeSlotEvent = new CalendarEvent(slotEvent, timeSlotElement);
//           timeSlotEvent.render();
//         });
//       }
//     });
//   }

//   render() {
//     this.updateTimeSlotsData();
//   }
// }
