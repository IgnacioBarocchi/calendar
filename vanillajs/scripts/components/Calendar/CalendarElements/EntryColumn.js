const EntryColumn = () => {
  const daysRows = document.querySelector("#days-row");

  const timezoneOffset = { 480: "UTC-8", 0: "UTC", 180: "UTC+3" }[
    Math.abs(new Date().getTimezoneOffset())
  ];

  appendElements(
    [createElement("th", { innerHTML: `<span>${timezoneOffset}</span>` })],
    daysRows
  );
};
