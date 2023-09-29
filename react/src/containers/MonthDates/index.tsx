import { FC, MouseEvent } from 'react';

import { ActionTypes } from '../../store/@types';
import { MonthViewItem } from '../../components/MonthView/MonthViewElements';
import mouseHandler from '../../lib/mouseHandler';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';

const MonthDates: FC<{
  monthDates: Date[];
}> = ({ monthDates }) => {
  const dispatch = useDispatch();

  const handleUpdateWeek = (mouseEvent: MouseEvent, date: Date) => {
    mouseHandler(mouseEvent, () => {
      const action = { type: ActionTypes.GET_WEEK_FROM_DATE, payload: date };
      dispatch(action);
    });
  };

  return (
    <>
      {monthDates.map((date: Date) => {
        return (
          <MonthViewItem
            key={nanoid()}
            date={date.getDate()}
            handler={(mouseEvent: MouseEvent) => {
              handleUpdateWeek(mouseEvent, date);
            }}
          ></MonthViewItem>
        );
      })}
    </>
  );
};

export default MonthDates;
