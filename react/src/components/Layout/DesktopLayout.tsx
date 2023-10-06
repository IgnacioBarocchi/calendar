import Aside from '../Aside';
import CalendarBody from '../CalendarBody';
import ClockHand from '../ClockHand';
import Header from '../Header';
import Main from '../Main/Main';

const DesktopLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Aside gridArea="aside" />
        <CalendarBody gridArea="calendar" />
      </Main>
      <ClockHand />
    </>
  );
};

export default DesktopLayout;
