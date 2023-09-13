//* displays constant information
const getTimeHeaderCell = (hour) => {
  //? Dom parser skipping th tag
  return createElement("th", {
    className: "entry-column",
    innerHTML: `
      <span>${hour}</span>
  `,
  });
};

const WeekTimeTable = (week) => {
  const calendar = document.querySelector("#calendar");
  [...Array(24).keys()].forEach((hour) => {
    const WeekTimeTable = document.createElement("tr");
    appendElements([getTimeHeaderCell(hour)], WeekTimeTable);

    week.forEach((dayString) => {
      const day = new Date(dayString);
      day.setHours(hour, 0, 0);

      const tableData = document.createElement("td");

      tableData.dataset.dayTime = day;

      WeekTimeTable.appendChild(tableData);
    });

    calendar.appendChild(WeekTimeTable);
  });
};

/*
const WeekTimeTable = (week) => {
  const weekTable = document.querySelector("#calendar");
  [...Array(24).keys()].forEach((hour) => {
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
*/
// const WeekTimeTable2 = createElement2(`
// <tr id="time-row-${hour}">
//     <span>${hour}</span>
// </tr>
// `);
