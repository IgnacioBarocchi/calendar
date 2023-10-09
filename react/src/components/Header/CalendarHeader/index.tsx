import {
  CalendarHeaderRowGrid,
  DayOfWeekItem,
  TimeZoneOffsetItem,
} from './CalendarHeaderElements';
import {
  CalendarHeaderRowProps,
  shouldCalendarHeaderRowPreventRender,
} from './helper';
import { FC, memo } from 'react';

import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

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
          const today = new Date().toDateString() === date.toDateString();
          return (
            <DayOfWeekItem
              key={nanoid()}
              today={today}
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
  shouldCalendarHeaderRowPreventRender,
);

export default CalendarHeaderRow;
