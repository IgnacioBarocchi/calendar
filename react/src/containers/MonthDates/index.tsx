import { FC, memo } from 'react';

import { ActionTypes } from '../../store/@types';
import { MonthViewItem } from '../../components/MonthView/MonthViewElements';
import { nanoid } from 'nanoid';
import { shouldMonthDatesPreventRender } from './helper';
import { useDispatch } from 'react-redux';

const MonthDates: FC<{
  monthDates: Date[];
}> = memo(({ monthDates }) => {
  const dispatch = useDispatch();

  const handleUpdateWeek = (date: Date) => {
    const action = { type: ActionTypes.GET_WEEK_FROM_DATE, payload: date };
    dispatch(action);
  };

  return (
    <>
      {monthDates.map((date: Date) => {
        const today = new Date().toDateString() === date.toDateString();
        return (
          <MonthViewItem
            key={nanoid()}
            date={date.getDate()}
            today={today}
            handler={() => {
              handleUpdateWeek(date);
            }}
          />
        );
      })}
    </>
  );
}, shouldMonthDatesPreventRender);

export default MonthDates;
