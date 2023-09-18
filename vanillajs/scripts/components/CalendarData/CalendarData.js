import CalendarHeaderColumn from "./CalendarDataElements/CalendarHeaderColumn";
import mapRange from "../../lib/mapRange";
import range from "../../lib/range";
// static class extends Container
export default class CalendarData {
  e = [];
  getElements() {
    mapRange(0, 24, (day) => {
      mapRange(0, 24, (hour) => {});
    });

    return this.e;
  }
}

// export default class Calendar {
//   headerColumnElements;
//   constructor() {
//     const headerColumn = new CalendarHeaderColumn();
//     headerColumnElements = headerColumn.getElements();
//   }

// }
