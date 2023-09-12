const clearCalendar = () => {
  const daysRows = document.querySelector("#days-row");
  daysRows.innerHTML = "";
  document.querySelectorAll("tr").forEach((node) => {
    node.remove();
  });
};

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
  if (!date) {
    date = new Date();
  }

  const isOngoingWeek = new Date().toDateString() === date.toDateString();

  const weekMap = getWeekDateByDayMap(date);
  DAYS_ABBREVIATIONS.forEach((day, i) => {
    const dateNumber = weekMap.get(String(i));
    const tableData = document.createElement("td");
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("days-of-week");

    const dayName = document.createElement("span");
    const dayNumber = document.createElement("span");
    dayName.appendChild(document.createTextNode(day.toUpperCase()));
    dayNumber.appendChild(document.createTextNode(dateNumber));

    dayContainer.appendChild(dayName);
    dayContainer.appendChild(dayNumber);
    tableData.appendChild(dayContainer);
    daysRows.appendChild(tableData);

    if (isOngoingWeek && date.getDate() === Number(dateNumber)) {
      dayNumber.classList.add("today-day");
    }
  });
};

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

const createWeekView = (date) => {
  clearCalendar();
  createEntryColumn();
  mapDaysRow(date);
  mapTimeRow();
};

createWeekView(new Date());
