import CalendarHeaderRow from "./HeaderElements/CalendarHeaderRow.js";
import NavigationBar from "./HeaderElements/NavigationBar.js";

export default class Header2 {
  store;
  navigation;
  calendarHeaderRow;

  constructor(store) {
    this.store = store;
    if (!this.store.selectedWeek) {
      this.store.setSelectedWeek(new Date(), 0);
    }

    this.navigation = new NavigationBar(this.store, this);
    this.calendarHeaderRow = new CalendarHeaderRow(this.store);
    this.navigation.navigate();
  }

  render() {
    this.calendarHeaderRow.render();
  }
}
