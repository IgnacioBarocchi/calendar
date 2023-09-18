export default class CalendarHeaderColumn {
  calendarHeaderColumnElements = [];

  getElements() {
    mapRange(0, 24, (hour) => {
      const time = new Date();
      time.setHours(hour, 0, 0);

      const textContent = time.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });

      calendarHeaderColumnElements.push(
        createElement2(
          `<div class="grid-item header-col">
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
