const Header = (date) => {
  // ! control rendering
  const shouldRender = false;

  document.querySelector("#month-label").textContent =
    MONTHS[getSundayOfWeek(date).getMonth()];
};

Header(new Date());
