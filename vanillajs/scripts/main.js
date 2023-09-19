import CalendarBody from "./components/CalendarBody/CalendarBody.js";
import CalendarHeaderRow from "./components/CalendarHeaderRow/CalendarHeaderRow.js";
import ClockHand from "./components/ClockHand/ClockHand.js";
import NavigationControls from "./controls/NavigationControls.js";
import StorageService from "./StorageService/StorageService.js";
// import removeDraftEvents from "./lib/removeDraftEvents.js";

const st = new StorageService();
const hd = new CalendarHeaderRow(st);
const cb = new CalendarBody(st);
const today = new Date();
window.addEventListener("DOMContentLoaded", () => {
  hd.render();
  cb.render();

  const nv = new NavigationControls(st, hd, cb);
  nv.navigate();

  const ClockHandComponent = new ClockHand(
    document.querySelector(
      `[data-slot-index="${today.getDay()}-${today.getHours()}"]`
    )
  );
  ClockHandComponent.startTick();
});
// querySelector("#aside-create-event-button")
