import { DAYS_ABBREVIATIONS } from "../../constants/index.js";
import appendElements from "../../lib/appendElements.js";
// 7 x 24 + 1 header column + 1 header row
import { createElement2 } from "../../lib/createElement.js";

const getHeaderCell = (text) =>
  createElement2(
    `<div class="grid-item header-row">
        <span>${text}</span>
    </div>`
  );

export const generateGrid = () => {
  const grid = document.getElementById("grid");
  //   headers
  appendElements(
    [
      getHeaderCell("time"),
      ...DAYS_ABBREVIATIONS.map((day) => {
        return getHeaderCell(day);
      }),
    ],
    grid
  );

  // data cells
  [...Array(24).keys()].forEach((hour) => {
    [...Array(8).keys()].forEach((day) => {
      const cell = document.createElement("div");
      cell.className = "grid-item";
      grid.appendChild(cell);
    });
  });
};
