import { FC, MouseEvent, MouseEventHandler } from 'react';

import { ActionTypes } from '../../store/@types';
import { MonthViewItem } from '../../components/UI';
import { getWeekFrom } from '../../lib/weekHelper';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';

const MonthDates: FC<{
  monthDates: Date[];
}> = ({ monthDates }) => {
  const dispatch = useDispatch();

  const handleUpdateWeek = (mouseEvent: MouseEvent, date: Date) => {
    debugger;
    const action = { type: ActionTypes.GET_WEEK_FROM_DATE, payload: date };
    console.log('action', action);

    dispatch(action);
  };

  return (
    <>
      {monthDates.map((date: Date) => {
        return (
          <MonthViewItem key={nanoid()}>
            <button
              onClick={(mouseEvent: MouseEvent) => {
                handleUpdateWeek(mouseEvent, date);
              }}
            >
              {date.getDate()}
            </button>
          </MonthViewItem>
        );
      })}
    </>
  );
};

export default MonthDates;
