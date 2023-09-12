const clearCalendar = () => {
  const daysRows = document.querySelector("#days-row");
  daysRows.innerHTML = "";
  document.querySelectorAll("tr").forEach((node) => {
    node.remove();
  });
};

const Calendar = (date = new Date()) => {
  clearCalendar();
  EntryColumn();
  DaysRow(date);
  TimeRow(date);
};

Calendar(new Date());
