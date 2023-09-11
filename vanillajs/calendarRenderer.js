const createEntryColumn = () => {
  const timeOffset = { 480: "UTC-8", 0: "UTC", 180: "UTC+3" }[
    Math.abs(new Date().getTimezoneOffset())
  ];

  const daysRows = document.querySelector("#days-row");
  const timeOffsetCell = document.createElement("td");
  timeOffsetCell.appendChild(document.createTextNode(timeOffset));
  timeOffsetCell.classList.add("entry-column");
  daysRows.appendChild(timeOffsetCell);
};

const mapDaysRow = (date) => {
  const daysRows = document.querySelector("#days-row");

  const today = new Date();
  const todayName = today
    .toLocaleDateString("en-us", { weekday: "short" })
    .toUpperCase();

  // const todayNumber = today.getDay();

  if (!date) {
    date = today;
  }

  DAYS_ABBREVIATIONS.forEach((day) => {
    const tableData = document.createElement("td");
    const dayName = document.createElement("span");
    const dayNumber = document.createElement("span");

    dayName.appendChild(document.createTextNode(day.toUpperCase()));
    dayNumber.appendChild(document.createTextNode(1));

    tableData.appendChild(dayName);
    tableData.appendChild(dayNumber);
    daysRows.appendChild(tableData);
  });
};

const mapTimeRow = (date) => {
  // if(!date) date = new Date();

  // date.getDay()
  // date.getDay()

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

const createWeekView = () => {
  createEntryColumn();
  mapDaysRow();
  mapTimeRow();
};

createWeekView();
