// todo: conver to singleton and use TypeScript modifiers
export default class NavigationBar {
  navigationIndex = 0;
  store;
  header;
  calendarBody;
  //! retrieve from html
  stages = ["next", "prev", "ongoing"];

  constructor(store /*instanceof Store | Store*/, header, calendarBody) {
    this.store = store;
    this.header = header;
    this.calendarBody = calendarBody;
    console.log(this.store);
  }

  /*private*/ incrementNavigationIndex() {
    this.navigationIndex++;
  }

  /*private*/ decrementNavigationIndex() {
    this.navigationIndex--;
  }

  /*private*/ resetNavigationIndex() {
    this.navigationIndex = 0;
  }

  /*private*/ getDateOf(requestedWeekView) {
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
  /*private*/ handleNavigationChange(requestedWeekView) {
    this[
      {
        prev: "decrementNavigationIndex",
        next: "incrementNavigationIndex",
        ongoing: "resetNavigationIndex",
      }[requestedWeekView]
    ]();

    // !maybe store should have navigation dependency injected
    // !to avoid circular dependency {navigationIndex/weekIndex}
    this.store.setSelectedWeek(
      this.getDateOf(requestedWeekView),
      this.navigationIndex
    );

    this.header.render();
    // !add
    // this.calendarBody.render();
  }

  navigate() {
    this.stages.forEach((requestedWeekView) => {
      const activeButton = document.querySelector(`#${requestedWeekView}-week`);
      activeButton.addEventListener("click", () =>
        this.handleNavigationChange.bind(this)(requestedWeekView)
      );
    });
  }
}
