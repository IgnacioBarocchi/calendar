import { ActionTypes, RootState } from '../../store/@types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import DesktopLayout from './DesktopLayout';
import SmallDeviceLayout from './SmallDeviceLayout';
import { getLocalHolidays } from '../../services/holidays.service';
import { getWeekEvents } from '../../services/events.service';

const Layout = () => {
  const dispatch = useDispatch();
  const { week } = useSelector((state: RootState) => ({
    week: state.week,
    holidays: state.holidays,
  }));

  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const isSmall = screenWidth < 768;

    setIsSmallDevice(isSmall);
    (async () => {
      dispatch({
        type: ActionTypes.SET_WEEK_EVENTS,
        payload: await getWeekEvents(week),
      });

      dispatch({
        type: ActionTypes.SET_HOLIDAYS,
        payload: await getLocalHolidays(week),
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isSmallDevice ? <SmallDeviceLayout /> : <DesktopLayout />}</>;
};

export default Layout;
