import { RootState } from './@types';
import { createSelector } from '@reduxjs/toolkit';

export const referenceSundaySelector = createSelector(
  (state: RootState) => state,
  (state) => state.week[0],
);

export const referenceSaturdaySelector = createSelector(
  (state: RootState) => state,
  (state) => state.week[6],
);

export const weekSelector = createSelector(
  (state: RootState) => state,
  (state) => state.week,
);

export const weekWithHolidaysSelector = createSelector(
  (state: RootState) => state,
  (state) => {
    if (!state.holidays) return;
    return state.week.map((date) => ({
      date,
      holiday: state.holidays.find((h) => {
        return h.date === date.toISOString().substring(0, 10);
      }),
    }));
  },
);
