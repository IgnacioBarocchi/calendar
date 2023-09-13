// Time cells
const WeekTimeTable = () => {
  const weekTable = document.querySelector("#week-table");
  [...Array(24).keys()].forEach((hour) => {
    const WeekTimeTable2 = createElement2(`
        <tr id="time-row-${hour}">
            <span>${hour}</span>
        </tr>
    `);

    const WeekTimeTable = document.createElement("tr");
    WeekTimeTable.id = "time-row-" + hour;
    const celHead = document.createElement("th");
    celHead.classList.add("entry-column");
    celHead.appendChild(document.createTextNode(hour));
    WeekTimeTable.appendChild(celHead);

    DAYS_ABBREVIATIONS.forEach((day) => {
      // const dateSlot = date;
      // dateSlot.setHours(hour);
      // dateSlot.setDate(1);
      // console.log(dateSlot);
      const tableData = document.createElement("td");
      // ! hago .toString()
      // ! cuando lo recibo hago new Date(payload)
      // todo: pass date!
      tableData.dataset.dayTime = JSON.stringify({
        name: day,
        number: 0,
        time: hour,
      });
      WeekTimeTable.appendChild(tableData);
    });

    weekTable.appendChild(WeekTimeTable);
  });
};
