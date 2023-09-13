const clearCalendar = () => {
  const DayRows = document.querySelector("#days-row");
  DayRows.innerHTML = "";
  document.querySelectorAll("tr").forEach((node) => {
    node.remove();
  });
};

const Calendar = (date = new Date()) => {
  clearCalendar();
  EntryColumn();
  DayRows(date);
  TimeRow(date);
};

Calendar(new Date());
