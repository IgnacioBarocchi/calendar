import { Week, indexOfDateInWeek } from '../../../lib/weekHelper';

import { desktopGeneric } from '../../../constants/theme';

export type TopLeftPosition = [number, number];
const { headerHeight, asideWidth, timeCellWidth } = desktopGeneric.size;

const [headerSize, asideSize, timeCellSize] = [
  headerHeight,
  asideWidth,
  timeCellWidth,
].map((d) => Number(d.replace('vh', '').replace('vw', '')));

const calendarBodyRelativeViewportWidth = 100 - (asideSize + timeCellSize);

export const getTimeSlotPixelsWidth = () =>
  (calendarBodyRelativeViewportWidth * window.innerWidth) / 100 / 7;

const getCordinatesOrigin = (): TopLeftPosition => {
  const top = (headerSize * window.innerHeight) / 100;
  const left = ((asideSize + timeCellSize) * window.innerWidth) / 100;
  return [top, left];
};

const secondsPassedFrom = (date: Date) => {
  const dateStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0,
  );
  //? new Date.now()
  const timeDifference = date.valueOf() - dateStart.valueOf();
  const secondsPassed = Math.floor(timeDifference / 1000);
  return secondsPassed;
};

export const getClockHandData = (week: Week): ClockHandData | null => {
  const today = new Date();
  const indexOfTodayInWeek = indexOfDateInWeek(today, week);
  if (!indexOfTodayInWeek) null;

  const timeSlotPixelsWidth = getTimeSlotPixelsWidth();
  const leftPad = timeSlotPixelsWidth * indexOfTodayInWeek;

  const [topOrigin, leftOrigin] = getCordinatesOrigin();

  const left = leftOrigin + leftPad;

  const nowSeconds = secondsPassedFrom(today);
  const viewportHeight = window.innerHeight;

  const timeSlotPixelsHeight = ((headerSize / 2) * viewportHeight) / 100;

  const pixelsPerSecond = timeSlotPixelsHeight / 3600;
  const top = topOrigin + pixelsPerSecond * nowSeconds;

  return {
    position: {
      top,
      left,
    },
    width: getTimeSlotPixelsWidth(),
    // 24h -> 86400s
    animationDuration: 86400 - nowSeconds,
  };
};

export interface ClockHandData {
  position: {
    top: number;
    left: number;
  };
  width: number;
  animationDuration: number;
}
