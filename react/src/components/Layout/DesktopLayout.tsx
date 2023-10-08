import Aside from '../Aside';
import CalendarBody from '../CalendarBody';
import ClockHand from '../ClockHand';
import Header from '../Header';
import Main from '../Main/Main';
import { RootState } from '../../store/@types';
import { useSelector } from 'react-redux';

const DesktopLayout = () => {
  const asideIsHidden = useSelector((state: RootState) => state.asideIsHidden);

  return (
    <>
      <Header />
      <Main>
        {asideIsHidden ? null : <Aside gridArea="aside" />}
        <CalendarBody asideIsHidden={asideIsHidden} gridArea="calendar" />
      </Main>
      <ClockHand />
    </>
  );
};

export default DesktopLayout;
