import createElement from '../../../lib/createElement.ts';
import mapRange from '../../../lib/mapRange.ts';

export default class CalendarHeaderColumn {
  static getElements() {
    const calendarHeaderColumnElements: HTMLElement[] = [];
    mapRange(0, 24, (hour: number) => {
      const time = new Date();
      time.setHours(hour, 0, 0);

      const textContent = time.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true,
      });

      calendarHeaderColumnElements.push(
        createElement(
          `<div class="grid-item header-column-item">
                <div class="header-text-container">
                    <span>${textContent}</span>
                </div>
            </div>`,
        ),
      );
    });

    return calendarHeaderColumnElements;
  }
}
