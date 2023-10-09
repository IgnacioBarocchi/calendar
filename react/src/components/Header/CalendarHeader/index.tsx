import {
  CalendarHeaderRowGrid,
  DayOfWeekItem,
  TimeZoneOffsetItem,
} from './CalendarHeaderElements';
import { FC, memo } from 'react';

import { Holiday } from '../../../store/@types';
import { Week } from '../../../lib/weekHelper';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

const areEqual = (
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

const CalendarHeaderRow: FC<CalendarHeaderRowProps> = memo(
  ({ gridArea, asideIsHidden, weekWithHolidays }) => {
    const { t, i18n } = useTranslation();
    if (!weekWithHolidays)
      return (
        <CalendarHeaderRowGrid
          gridArea={gridArea}
          asideIsHidden={asideIsHidden}
        >
          <TimeZoneOffsetItem />
          {[...Array(7).keys()].map((dayNumber) => {
            return (
              <DayOfWeekItem
                key={dayNumber}
                today={false}
                dateNumber={0}
                weekDay={String(
                  new Intl.DateTimeFormat('en-US', {
                    weekday: 'short',
                  })
                    .format(new Date(2000, 0, dayNumber + 1))
                    .toUpperCase(),
                )}
              ></DayOfWeekItem>
            );
          })}
        </CalendarHeaderRowGrid>
      );

    return (
      <CalendarHeaderRowGrid gridArea={gridArea} asideIsHidden={asideIsHidden}>
        <TimeZoneOffsetItem />
        {weekWithHolidays.map((record) => {
          const { date, holiday } = record;

          return (
            <DayOfWeekItem
              key={nanoid()}
              today={new Date().toDateString() === date.toDateString()}
              dateNumber={date.getDate()}
              weekDay={date
                .toLocaleDateString(t('locale'), {
                  weekday: 'short',
                })
                .toUpperCase()}
              folderEventText={
                holiday
                  ? holiday[i18n.language === 'en' ? 'name' : 'localName']
                  : undefined
              }
            ></DayOfWeekItem>
          );
        })}
      </CalendarHeaderRowGrid>
    );
  },
  areEqual,
);

export default CalendarHeaderRow;

interface CalendarHeaderRowProps {
  gridArea: string;
  asideIsHidden: boolean;
  week: Week;
  weekWithHolidays?: {
    date: Date;
    holiday?: Holiday;
  }[];
}
