import CalendarBody from "./components/CalendarBody/CalendarBody.js";
import CalendarHeaderRow from "./components/CalendarHeaderRow/CalendarHeaderRow.js";
import NavigationControls from "./controls/NavigationControls.js";
import SessionStorageService2 from "./storage/Storage.js";
// import removeDraftEvents from "./lib/removeDraftEvents.js";

const st = new SessionStorageService2();
const hd = new CalendarHeaderRow(st);
const cb = new CalendarBody(st);

window.addEventListener("DOMContentLoaded", () => {
  hd.render();
  cb.render();

  const nv = new NavigationControls(st, hd, cb);
  nv.navigate();
});
// querySelector("#aside-create-event-button")
