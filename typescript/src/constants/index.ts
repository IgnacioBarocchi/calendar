// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
const MONTHS: string[] = [];
const MONTHS_ABBREVIATIONS: string[] = [];
const DAYS: string[] = [];
const DAYS_ABBREVIATIONS: string[] = [];
const TIME_ZONE_OFFSET = { 480: 'UTC-8', 0: 'UTC', 180: 'UTC+3' }[
  Math.abs(new Date().getTimezoneOffset())
];

for (let i = 0; i < 12; i++) {
  const date = new Date(2023, i, 1);

  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    date,
  );
  const monthAbbreviation = new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(date);

  MONTHS.push(monthName);
  MONTHS_ABBREVIATIONS.push(monthAbbreviation);
}

for (let i = 0; i < 7; i++) {
  const date = new Date(2023, 0, i + 1);

  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    date,
  );
  const dayAbbreviation = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(date);

  DAYS.push(dayName);
  DAYS_ABBREVIATIONS.push(dayAbbreviation);
}

// todo: make .env file DEV PROD modes
// * https://www.snowpack.dev/reference/environment-variables
const USE_WEEK_CACHING = false;
const USE_JSON_SERVER = false;

export {
  USE_WEEK_CACHING,
  USE_JSON_SERVER,
  MONTHS,
  MONTHS_ABBREVIATIONS,
  DAYS,
  DAYS_ABBREVIATIONS,
  TIME_ZONE_OFFSET,
};
