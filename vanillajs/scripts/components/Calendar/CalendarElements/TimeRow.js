const TimeRow = () => {
  const weekTable = document.querySelector("#week-table");
  [...Array(24).keys()].forEach((hour) => {
    const timeRow = document.createElement("tr");
    timeRow.id = "time-row-" + hour;
    const celHead = document.createElement("th");
    celHead.classList.add("entry-column");
    celHead.appendChild(document.createTextNode(hour));
    timeRow.appendChild(celHead);

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
      timeRow.appendChild(tableData);
    });

    weekTable.appendChild(timeRow);
  });
};
