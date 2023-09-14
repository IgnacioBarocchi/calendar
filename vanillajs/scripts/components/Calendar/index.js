import EntryColumn from "./CalendarElements/EntryColumn.js";
import HeaderDaysRow from "./CalendarElements/HeaderDaysRow.js";
import WeekTimeTable from "./CalendarElements/WeekTimeTable.js";
import { getWeekFrom } from "../../helpers/calendarHelper.js";
const clearCalendar = () => {
  const headerDaysRow = document.querySelector("#days-row");
  headerDaysRow.innerHTML = "";
  document.querySelectorAll("tr").forEach((node) => {
    node.remove();
  });
};

const Calendar = (date = new Date()) => {
  const week = getWeekFrom(date);
  clearCalendar();
  EntryColumn();
  HeaderDaysRow(date);
  WeekTimeTable(week);
};

Calendar(new Date());

export default Calendar;
