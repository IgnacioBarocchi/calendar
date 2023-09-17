import { TIME_ZONE_OFFSET } from "../../../constants/index.js";
import { createElement2 } from "../../../lib/createElement.js";

export default class CalendarHeader {
  store;

  constructor(store) {
    this.store = store;
  }
  // isTimeZoneOffset;
  // dateName;
  // dateNumber;
  // element;

  // constructor(dateName, dateNumber, isTimeZoneOffset) {
  //   this.dateName = dateName;
  //   this.dateNumber = dateNumber;
  //   this.isTimeZoneOffset = isTimeZoneOffset;
  // }

  // /*private*/ getDataFragment() {
  //   if (!isTimeZoneOffset) {
  //     //   hightlight if today
  //     const shouldHightlight = false;
  //     return `
  //           <span class="date-name">${this.dateName}</span>
  //           <span class="date-number">${this.dateNumber}</span>
  //       `;
  //   }

  //   return `<span class="date-name">${TIME_ZONE_OFFSET}</span>`;
  // }

  // render() {
  //   const HTMLString = `<div class="grid-item header-row">
  //       <div class="header-text-container">
  //         ${this.getDataFragment()}
  //       </div>
  //   </div>`;

  //   const calendarHeaderElement = createElement2(HTMLString);
  //   this.element = calendarHeaderElement;
  //   return calendarHeaderElement;
  // }
  render() {}
}
