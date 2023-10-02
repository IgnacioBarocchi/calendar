import { Week, indexOfDateInWeek } from '../../../lib/weekHelper';

import { desktopGeneric } from '../../../constants/theme';

export const getClockHandPosition = (week: Week): [number, number] => {
  const today = new Date();

  const indexOfTodayInWeek = indexOfDateInWeek(today, week);
  if (!indexOfTodayInWeek) return [-1, -1];
  // con esto podemos saber la cantidad de timeslots!!!
  // por ejemplo si el index es 0 es el domingo.
  // si posicionamos la mano dentro de los datos y el 0, 0 es el domingo a las 0 0,
  // sabiendo el ancho podemos determinar "left"

  const seconds = today.getSeconds();
  const minutes = today.getSeconds();
  console.log(seconds, minutes);

  const viewportHeight = window.innerHeight;

  const timeSlotPixelsHeight =
    ((Number(desktopGeneric.size.headerHeight.replace('vh', '')) / 2) *
      viewportHeight) /
    100;

  const pixelPerSecond = timeSlotPixelsHeight / 3600;
  console.log(pixelPerSecond);

  const top = 0;
  const left = 0;
  return [top, left];
};
