// todo: conver to singleton using typescript modifiers
export default class NavigationBar {
  navigationIndex = 0;
  store;
  stages = ["next", "prev", "ongoing"];
  constructor(store /*instanceof Store | Store*/) {
    this.store = store;
  }

  incrementNavigationIndex() {
    this.navigationIndex++;
  }

  decrementNavigationIndex() {
    this.navigationIndex--;
  }

  resetNavigationIndex() {
    this.navigationIndex = 0;
  }

  getDateOf(requestedWeekView) {
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
  handleNavigationChange(requestedWeekView) {
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
