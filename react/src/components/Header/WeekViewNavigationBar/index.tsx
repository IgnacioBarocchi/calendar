import { Button, Text } from '../../UI';
import {
  MonthLabel,
  NavContainer,
  NextWeekButton,
  PrevWeekButton,
} from './WeekViewNavigationBarElements';

import { ActionTypes } from '../../../store/@types';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line react-refresh/only-export-components
const WeekViewNavigationBar: FC<{ gridArea: string }> = ({ gridArea }) => {
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
    <NavContainer gridArea={gridArea}>
      <nav>
        <PrevWeekButton onClick={handlePreviousWeekClick} />
        <NextWeekButton onClick={handleNextWeekClick} />
        <Button onClick={handleTodayClick} label="today" border={true} />
      </nav>
      <MonthLabel size="l" weight="bold">
        september
      </MonthLabel>
    </NavContainer>
  );
};

export default WeekViewNavigationBar;
