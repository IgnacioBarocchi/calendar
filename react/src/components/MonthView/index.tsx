import { MonthDatesHeader, MonthViewContainer } from './MonthViewElements';

import MonthDates from '../../containers/MonthDates';
import { RootState } from '../../store/@types';
// todo: move to custom redux-toolkit selector
import { getMonthDatesOfYear } from './helper';
import { useSelector } from 'react-redux';

const MonthView = () => {
  const week = useSelector((state: RootState) => state.week);

  return (
    <MonthViewContainer>
      <MonthDatesHeader week={week} />
      <MonthDates monthDates={getMonthDatesOfYear(week)} />
    </MonthViewContainer>
  );
};

export default MonthView;
