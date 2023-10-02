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

const secondsPassedFrom = (today: Date) => {
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0,
  );

  const timeDifference = today.valueOf() - todayStart.valueOf();
  const secondsPassed = Math.floor(timeDifference / 1000);
  return secondsPassed;
};

export const getClockHandPosition = (week: Week): TopLeftPosition => {
  const today = new Date();
  const indexOfTodayInWeek = indexOfDateInWeek(today, week);
  if (!indexOfTodayInWeek) return [-1, -1];

  const timeSlotPixelsWidth = getTimeSlotPixelsWidth();
  const leftPad = timeSlotPixelsWidth * indexOfTodayInWeek;

  const [topOrigin, leftOrigin] = getCordinatesOrigin();

  const left = leftOrigin + leftPad;

  const nowSeconds = secondsPassedFrom(today);
  const viewportHeight = window.innerHeight;

  const timeSlotPixelsHeight = ((headerSize / 2) * viewportHeight) / 100;

  const pixelPerSecond = timeSlotPixelsHeight / 3600;
  const top = topOrigin + pixelPerSecond * nowSeconds;
  return [top, left];
};
