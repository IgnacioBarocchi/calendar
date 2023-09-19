// todo: conver to singleton and use TypeScript modifiers
export default class NavigationControls {
  navigationIndex = 0;
  storage;
  header;
  calendarBody;
  calendarMonth;
  //! retrieve from html
  stages = ["next", "prev", "ongoing"];

  constructor(storage, header, calendarBody, calendarMonth) {
    this.storage = storage;
    this.header = header;
    this.calendarBody = calendarBody;
    this.calendarMonth = calendarMonth;
  }

  _incrementNavigationIndex() {
    this.navigationIndex++;
  }

  _decrementNavigationIndex() {
    this.navigationIndex--;
  }

  _resetNavigationIndex() {
    this.navigationIndex = 0;
  }

  _getDateOf(requestedWeekView) {
    const numberOfDaysToAdd = { ongoing: 0, next: 7, prev: -7 }[
      requestedWeekView
    ];

    const today = new Date();
    if (numberOfDaysToAdd === 0) return today;

    return new Date(
      today.setDate(today.getDate() + numberOfDaysToAdd * this.navigationIndex)
    );
  }
  // !super ugly
  _handleNavigationChange(requestedWeekView) {
    this[
      {
        prev: "_decrementNavigationIndex",
        next: "_incrementNavigationIndex",
        ongoing: "_resetNavigationIndex",
      }[requestedWeekView]
    ]();

    // !maybe storage should have navigation dependency injected
    // !to avoid circular dependency {navigationIndex/weekIndex}
    this.storage.setSelectedWeek(
      this._getDateOf(requestedWeekView),
      this.navigationIndex
    );

    this.calendarMonth.parentElement.innerHTML = "";
    [(this.header, this.calendarBody, this.calendarMonth)].forEach(
      (component) => {
        component.render();
      }
    );
  }

  navigate() {
    this.stages.forEach((requestedWeekView) => {
      const activeButton = document.querySelector(`#${requestedWeekView}-week`);
      activeButton.addEventListener("click", () =>
        this._handleNavigationChange.bind(this)(requestedWeekView)
      );
    });
  }
}
