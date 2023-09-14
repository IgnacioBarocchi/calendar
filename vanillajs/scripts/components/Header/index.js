import { MONTHS } from "../../constants/index.js";
import { getSundayOfWeek } from "../../helpers/calendarHelper.js";
const Header = (date) => {
  const shouldRender = false;

  document.querySelector("#month-label").textContent =
    MONTHS[getSundayOfWeek(date).getMonth()];
};

Header(new Date());

export default Header;
