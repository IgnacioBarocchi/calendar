import {
  NextWeekButton,
  PrevWeekButton,
} from './WeekViewNavigationBarElements';

import { ActionTypes } from '../../../store/@types';
import { Button } from '../../UI/UI';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line react-refresh/only-export-components
const WeekViewNavigationBar = () => {
  const dispatch = useDispatch();

  const handleNextWeekClick = () => {
    dispatch({ type: ActionTypes.GET_NEXT_WEEK });
  };

  const handlePreviousWeekClick = () => {
    dispatch({ type: ActionTypes.GET_PREVIOUS_WEEK });
  };

  const handleTodayClick = () => {
    dispatch({ type: ActionTypes.GET_ONGOING_WEEK });
  };

  return (
    <>
      <span>september</span>
      <nav>
        <PrevWeekButton onClick={handlePreviousWeekClick} />
        <NextWeekButton onClick={handleNextWeekClick} />
        <Button onClick={handleTodayClick}>today</Button>
      </nav>
    </>
  );
};

export default styled(WeekViewNavigationBar)`
  display: flex;
  align-items: center;
`;
