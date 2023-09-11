1. If I know the today's date, I can infer the rest of the week.

Without parameters:
```JavaScript
const createOngoingWeekMap = () => {
  const today = new Date();
  const day = today.getDay();
  const date = today.getDate();
  const weekMap = new Map();
  weekMap.set(day, date);

  for (let i = 0; i < 6; i++) {
    if (day === i) {
      weekMap.set(day, date);
      weekMap.set(day + 1, date + 1);
    }

    if (day < i) {
      weekMap.set(day + i, date + i);
    } else {
      weekMap.set(day - i, date - i);
    }
  }

  return weekMap;
};
```

1.1 Valitate date for week between 2 months. 
  Conditions: the date can't be negative.
  the date can't be greater than the cap of the current or previous month
1.2create a month-day map
```JavaScript failed attempt
  const monthDaysByMonth = new Map(
    [...Array(11).keys()].map((month) => {
      return [month, new Date(today.getFullYear(), month + 2, 0).getDate()];
    })
  );
```
```Javascript weird but correct
const monthDaysByMonth = new Map(
  [...Array(13).keys()].slice(1).map((month) => {
    const year = today.getFullYear();
    const nextMonth = month === 12 ? 1 : month + 1;
    return [nextMonth, new Date(year, nextMonth, 0).getDate()];
  })
);
```
***
```JavaScript Uselss solution. It can be simpler if we add 7 days or substract 7 days using the Date constructor 🤦
const getMonthDaysByMonth = (year) => {
  const monthDaysByMonth = new Map(
    [...Array(13).keys()].slice(1).map((month) => {
      const nextMonth = month === 12 ? 1 : month + 1;
      return [nextMonth, new Date(year, nextMonth, 0).getDate()];
    })
  );

  return monthDaysByMonth;
};

const createOngoingWeekMap = () => {
  const today = new Date();
  const day = today.getDay();
  const date = today.getDate();
  const month = today.getMonth();
  const monthDaysByMonth = getMonthDaysByMonth(day.getFullYear());

  const weekMap = new Map();
  weekMap.set(day, date);

  for (let i = 0; i < 6; i++) {
    if (day === i) {
      weekMap.set(day, date);
      weekMap.set(day + 1, date + 1);
    }

    if (day < i) {
      if (day is greater than the number of days of the month (28, 30 or 31) accordingly, do something else) {
      }
      weekMap.set(day + i, date + i);
    } else {
      if (i < 0) {
        do something 
      } else {
        weekMap.set(day - i, date - i);
      }
    }
  }

  return weekMap;
};

```
So we can have something like this:

```TypeScript
 const navigateWeeks = (target: 'prev'|'next'|'current', index = 0) => {
  const weekFactor = {current: 0, next:7, prev:-7}[target]
    const today = new Date();
    const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (weekFactor * Math.abs(index)));
    return nextweek;
}
```
1. If I know its the week number, I can navigate through the weeks (user input)