const mapDaysRow = () => {
  const timeOffset = { 480: "UTC-8", 0: "UTC", 180: "UTC+3" }[
    Math.abs(new Date().getTimezoneOffset())
  ];
  // separar
  const daysRows = document.querySelector("#days-row");
  const timeOffsetCell = document.createElement("td");
  timeOffsetCell.appendChild(document.createTextNode(timeOffset));
  timeOffsetCell.classList.add("entry-column");
  daysRows.appendChild(timeOffsetCell);

  DAYS_ABBREVIATIONS.forEach((day) => {
    const tableData = document.createElement("td");
    tableData.appendChild(document.createTextNode(day.toUpperCase()));
    daysRows.appendChild(tableData);
  });
};

mapDaysRow();

const mapTimeRow = () => {
  const weekTable = document.querySelector("#week-table");
  [...Array(24).keys()].forEach((hour) => {
    const timeRow = document.createElement("tr");
    timeRow.id = "time-row-" + hour;
    const celHead = document.createElement("td");
    celHead.classList.add("entry-column");
    celHead.appendChild(document.createTextNode(hour));

    timeRow.appendChild(celHead);
    DAYS_ABBREVIATIONS.forEach((day) => {
      const tableData = document.createElement("td");
      tableData.dataset.dayTime = JSON.stringify({
        name: day,
        number: 0,
        time: hour,
      });
      timeRow.appendChild(tableData);
    });

    weekTable.appendChild(timeRow);
  });
};

mapTimeRow();
