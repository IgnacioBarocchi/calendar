import CalendarHeader from "./HeaderElements/CalendarHeader.js";
import NavigationBar from "./HeaderElements/NavigationBar.js";

export default class Header2 {
  navigation;
  calendarHeader;

  constructor(store) {
    this.navigation = new NavigationBar(store);
    this.calendarHeader = new CalendarHeader(store);
  }

  render() {
    this.navigation.navigate();
    this.calendarHeader.render();
  }
}
