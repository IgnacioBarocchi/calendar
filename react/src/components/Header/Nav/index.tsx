import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';

import { ActionTypes } from '../../../store/@types';
import { Button } from '../../UI';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Nav = () => {
  const { t, i18n } = useTranslation();

  const todayButtonLabel = useMemo(() => t('today'), [i18n.language]);
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
    <nav style={{ display: 'flex' }}>
      <Button onClick={handlePreviousWeekClick} Icon={TfiAngleLeft} />
      <Button onClick={handleNextWeekClick} Icon={TfiAngleRight} />
      <Button
        onClick={handleTodayClick}
        label={todayButtonLabel}
        border={true}
      />
    </nav>
  );
};

export default Nav;
