import { FC, memo } from 'react';

import { ActionTypes } from '../../store/@types';
import { MonthViewItem } from '../../components/MonthView/MonthViewElements';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';

const areEqual = (
  prevProps: { monthDates: Date[] },
  nextProps: { monthDates: Date[] },
) => {
  if (!prevProps.monthDates) return false;
  if (!nextProps.monthDates) return false;

  return (
    prevProps.monthDates[0].toDateString() ===
    nextProps.monthDates[0].toDateString()!
  );
};

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
        return (
          <MonthViewItem
            key={nanoid()}
            date={date.getDate()}
            today={date.toDateString() === new Date().toDateString()}
            handler={() => {
              handleUpdateWeek(date);
            }}
          ></MonthViewItem>
        );
      })}
    </>
  );
}, areEqual);

export default MonthDates;
