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
    if (this.constructor.instance) {
      return this.constructor.instance;
    }
    this.storage = storage;
    this.header = header;
    this.calendarBody = calendarBody;
    this.calendarMonth = calendarMonth;
    this.constructor.instance = this;
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

    // !maybe storage should have navigation dependency injected | object manager class (App)
    // !to avoid circular dependency {navigationIndex/weekIndex}
    this.storage.setSelectedWeek(
      this._getDateOf(requestedWeekView),
      this.navigationIndex
    );

    this.reRenderControlledComponents();
  }

  reRenderControlledComponents() {
    this.calendarMonth.calendarBodyElement.innerHTML = "";
    [this.header, this.calendarBody, this.calendarMonth].forEach(
      (component) => {
        component.render();
      }
    );
  }

  navigateWithDaysOfMonth(date) {
    const referenceSunday = this.storage.selectedWeek[0];
    const currentNavigationIndex = this.navigationIndex;

    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const sundayOfCurrentWeek = new Date(currentDate);
    sundayOfCurrentWeek.setDate(currentDate.getDate() + daysUntilSunday);

    const timeDiff = sundayOfCurrentWeek - referenceSunday;
    const weekDiff = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));

    this.navigationIndex = this.navigationIndex + weekDiff;

    this.storage.setSelectedWeek(currentDate, this.navigationIndex);
    this.reRenderControlledComponents();
  }

  navigateWithNavbar() {
    this.stages.forEach((requestedWeekView) => {
      const activeButton = document.querySelector(`#${requestedWeekView}-week`);
      activeButton.addEventListener("click", () =>
        this._handleNavigationChange.bind(this)(requestedWeekView)
      );
    });
  }
}
