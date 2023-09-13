const clearCalendar = () => {
  const HeaderDaysRow = document.querySelector("#days-row");
  HeaderDaysRow.innerHTML = "";
  document.querySelectorAll("tr").forEach((node) => {
    node.remove();
  });
};

const Calendar = (date = new Date()) => {
  clearCalendar();
  EntryColumn();
  HeaderDaysRow(date);
  TimeRow(date);
};

Calendar(new Date());
