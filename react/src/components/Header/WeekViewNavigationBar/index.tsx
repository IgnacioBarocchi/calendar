import { FC, memo } from 'react';
import {
  MonthLabel,
  NavContainer,
  NextWeekButton,
  PrevWeekButton,
} from './WeekViewNavigationBarElements';

import { ActionTypes } from '../../../store/@types';
import { Button } from '../../UI';
import { useDispatch } from 'react-redux';

const WeekViewNavigationBar: FC<{ gridArea: string; month: string }> = memo(
  ({ gridArea, month }) => {
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
        <nav style={{ display: 'flex' }}>
          <PrevWeekButton onClick={handlePreviousWeekClick} />
          <NextWeekButton onClick={handleNextWeekClick} />
          <Button onClick={handleTodayClick} label="today" border={true} />
        </nav>
        <MonthLabel size="l" weight="bold">
          {month}
        </MonthLabel>
      </NavContainer>
    );
  },
  (oldProps, nextProps) => oldProps.month === nextProps.month,
);

export default WeekViewNavigationBar;
