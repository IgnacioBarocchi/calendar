const EntryColumn = () => {
  const timeOffset = { 480: "UTC-8", 0: "UTC", 180: "UTC+3" }[
    Math.abs(new Date().getTimezoneOffset())
  ];

  const daysRows = document.querySelector("#days-row");
  const timeOffsetCell = document.createElement("td");
  timeOffsetCell.appendChild(document.createTextNode(timeOffset));
  timeOffsetCell.classList.add("entry-column");
  daysRows.appendChild(timeOffsetCell);
};
