import { CalendarEvent, RootState } from './@types';

import { createSelector } from '@reduxjs/toolkit';

const getState = (state: RootState) => state;

export const referenceSundaySelector = createSelector(
  getState,
  (state) => state.week[0],
);

export const referenceSaturdaySelector = createSelector(
  getState,
  (state) => state.week[6],
);

export const weekSelector = createSelector(getState, (state) => state.week);

export const weekWithHolidaysSelector = createSelector(getState, (state) => {
  if (!state.holidays) return;
  return state.week.map((date) => ({
    date,
    holiday: state.holidays.find((h) => {
      return h.date === date.toISOString().substring(0, 10);
    }),
  }));
});

const getMapKeyFrom = (date: Date) => {
  const matchingStartTime = new Date(date);
  matchingStartTime.setMinutes(0);
  matchingStartTime.setSeconds(0);
  matchingStartTime.setMilliseconds(0);

  return matchingStartTime.toISOString();
};

export const newEventsMapSelector = createSelector(getState, (state) => {
  const newEventsMap = new Map<string, CalendarEvent[]>();

  state.weekEvents.forEach((event) => {
    const key = getMapKeyFrom(event.start);

    if (!newEventsMap.has(key)) {
      newEventsMap.set(key, []);
    }

    newEventsMap.get(key)?.push(event);
  });

  return newEventsMap;
});
