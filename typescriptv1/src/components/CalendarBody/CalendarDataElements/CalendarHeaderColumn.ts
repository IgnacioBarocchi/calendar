// todo: static
import { createElement2 } from "../../../lib/createElement.ts";
import mapRange from "../../../lib/mapRange.ts";
export default class CalendarHeaderColumn {
  /*private? | {get, _} accessor*/ calendarHeaderColumnElements = [];
  getElements() {
    mapRange(0, 24, (hour) => {
      const time = new Date();
      time.setHours(hour, 0, 0);

      const textContent = time.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });

      this.calendarHeaderColumnElements.push(
        createElement2(
          `<div class="grid-item header-column-item">
                <div class="header-text-container">
                    <span>${textContent}</span>
                </div>
            </div>`
        )
      );
    });

    return this.calendarHeaderColumnElements;
  }
}
