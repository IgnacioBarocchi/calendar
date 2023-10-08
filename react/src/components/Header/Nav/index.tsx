import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';

import { ActionTypes } from '../../../store/@types';
import { Button } from '../../UI';
import { Fonts } from '../../../constants/theme';
import { NavContainer } from './NavElements';
import { block } from 'million/react';
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
    <NavContainer>
      <Button
        onClick={handleTodayClick}
        label={todayButtonLabel}
        border={true}
        safeSpace={true}
        font={Fonts.SupremeBold}
        size={'m'}
      />
      <Button onClick={handlePreviousWeekClick} Icon={TfiAngleLeft} />
      <Button onClick={handleNextWeekClick} Icon={TfiAngleRight} />
    </NavContainer>
  );
};

export default block(Nav);
