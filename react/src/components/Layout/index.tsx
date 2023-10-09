import { setHolidays, setWeekEvents } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import DesktopLayout from './DesktopLayout';
import { RootState } from '../../store/@types';
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
      dispatch(setWeekEvents(await getWeekEvents(week)));
      dispatch(setHolidays(await getLocalHolidays(week)));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isSmallDevice ? <SmallDeviceLayout /> : <DesktopLayout />}</>;
};

export default Layout;
