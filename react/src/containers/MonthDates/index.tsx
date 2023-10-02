import { ActionTypes } from '../../store/@types';
import { FC } from 'react';
import { MonthViewItem } from '../../components/MonthView/MonthViewElements';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';

const MonthDates: FC<{
  monthDates: Date[];
}> = ({ monthDates }) => {
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
};

export default MonthDates;
