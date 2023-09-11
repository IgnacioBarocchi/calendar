const createHeaderDateTextContent = (selectedDate) => {
  const header = document.querySelector("#header-menu");
  const currentDateElement = document.createElement("li");
  const today = selectedDate ?? new Date();
  const internationalization = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  });
  currentDateElement.appendChild(
    document.createTextNode(internationalization.format(today))
  );
  header.appendChild(currentDateElement);
};

createHeaderDateTextContent(null);

document.querySelector("#prev-week").addEventListener("click", function (e) {
  localStorageService.ge;
});
