import Aside from '../Aside';
import CalendarBody from '../CalendarBody';
import ClockHand from '../ClockHand';
import Header from '../Header';
import Main from '../Main/Main';
import { ReactElement } from 'react';
import { RootState } from '../../store/@types';
import { useSelector } from 'react-redux';

const DesktopLayout = () => {
  const asideIsHidden = useSelector((state: RootState) => state.asideIsHidden);
  // todo: check types
  return (
    <>
      <Header />
      <Main>
        {asideIsHidden ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (null as unknown as ReactElement<unknown, any>)
        ) : (
          <Aside gridArea="aside" />
        )}
        <CalendarBody asideIsHidden={asideIsHidden} gridArea="calendar" />
      </Main>
    </>
  );
};

export default DesktopLayout;
