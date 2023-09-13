const clearCalendar = () => {
  const HeaderDaysRow = document.querySelector("#days-row");
  HeaderDaysRow.innerHTML = "";
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
