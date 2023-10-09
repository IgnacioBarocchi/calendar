import { Holiday } from '../../../../store/@types';
import { Week } from '../../../../lib/weekHelper';

export interface CalendarHeaderRowProps {
  gridArea: string;
  asideIsHidden: boolean;
  week: Week;
  weekWithHolidays?: {
    date: Date;
    holiday?: Holiday;
  }[];
}

export const shouldCalendarHeaderRowPreventRender = (
  prevProps: CalendarHeaderRowProps,
  nextProps: CalendarHeaderRowProps,
) => {
  const props = [
    prevProps.weekWithHolidays,
    nextProps.weekWithHolidays,
    nextProps.asideIsHidden,
    nextProps.asideIsHidden,
  ];

  if (props.every((value) => value === undefined)) return false;

  if (!prevProps.weekWithHolidays) return false;
  if (!nextProps.weekWithHolidays) return false;

  const weekDidntChange =
    prevProps.weekWithHolidays[0].date.toDateString() ===
    nextProps.weekWithHolidays[0].date.toDateString()!;

  const layoutDidntChange = prevProps.asideIsHidden === nextProps.asideIsHidden;
  return weekDidntChange && layoutDidntChange;
};
