import { MONTHS } from "../../constants/index.js";
import { getSundayOfWeek } from "../../helpers/calendarHelper.js";

const Header = (date) => {
  const shouldRender = false;
  const startDate = getSundayOfWeek(date);
  document.querySelector("#month-label").textContent = `${
    MONTHS[startDate.getMonth()]
  } ${startDate.getFullYear()}`;
};

export default Header;
