// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
const MONTHS = [];
const MONTHS_ABBREVIATIONS = [];
const DAYS = [];
const DAYS_ABBREVIATIONS = [];

for (let i = 0; i < 12; i++) {
  const date = new Date(2023, i, 1);

  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const monthAbbreviation = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(date);

  MONTHS.push(monthName);
  MONTHS_ABBREVIATIONS.push(monthAbbreviation);
}

for (let i = 0; i < 7; i++) {
  const date = new Date(2023, 0, i + 1);

  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );
  const dayAbbreviation = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);

  DAYS.push(dayName);
  DAYS_ABBREVIATIONS.push(dayAbbreviation);
}
