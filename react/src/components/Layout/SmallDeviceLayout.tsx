import { useDispatch, useSelector } from 'react-redux';

import Aside from '../Aside';
import CalendarBody from '../CalendarBody';
import Header from '../Header';
import Main from '../Main/Main';
import { RootState } from '../../store/@types';
import { getWeekEvents } from '../../services/events.service';
import { setWeekEvents } from '../../store/actions';
import { useEffect } from 'react';

const SmallDeviceLayout = () => {
  const dispatch = useDispatch();
  const week = useSelector((state: RootState) => state.week);

  useEffect(() => {
    (async () => {
      dispatch(setWeekEvents(await getWeekEvents(week)));
    })();
  });

  return (
    <>
      <Header />
      <Main>
        <Aside gridArea="aside" />
        <CalendarBody asideIsHidden={true} gridArea="calendar" />
      </Main>
    </>
  );
};

export default SmallDeviceLayout;
