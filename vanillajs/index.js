const mapDaysRow = () => {
  const daysRows = document.querySelector("#days-row");

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

    DAYS_ABBREVIATIONS.forEach((day) => {
      const tableData = document.createElement("td");
      tableData.dataset.dayTime = JSON.stringify({
        name: day,
        number: 0,
        time: hour,
      });
      tableData.appendChild(document.createTextNode(hour + ""));
      timeRow.appendChild(tableData);
    });

    weekTable.appendChild(timeRow);
  });
};

mapTimeRow();

document.querySelectorAll("[data-day-time]").forEach((element) => {
  element.addEventListener("click", function () {
    console.log(this.dataset.toString());
  });
});

// ('[data^="data-day"]');
