import { ActionTypes, RootState } from '../../store/@types';
import { useDispatch, useSelector } from 'react-redux';

import Aside from '../Aside';
import CalendarBody from '../CalendarBody';
import Header from '../Header';
import Main from '../Main/Main';
import { getWeekEvents } from '../../services/events.service';
import { useEffect } from 'react';

const SmallDeviceLayout = () => {
  const dispatch = useDispatch();
  const week = useSelector((state: RootState) => state.week);

  useEffect(() => {
    (async () => {
      dispatch({
        type: ActionTypes.SET_WEEK_EVENTS,
        payload: await getWeekEvents(week),
      });
    })();
  });

  return (
    <>
      <Header />
      <Main>
        <Aside gridArea="aside" />
        <CalendarBody gridArea="calendar" />
      </Main>
    </>
  );
};

export default SmallDeviceLayout;
