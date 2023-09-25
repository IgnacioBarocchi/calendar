import Aside from '../Aside';
import CalendarBody from '../CalendarBody';
import { MainContainer } from './MainElements';

const Main = () => {
  return (
    <MainContainer>
      <Aside gridArea="aside" />
      <CalendarBody gridArea="calendar" />
    </MainContainer>
  );
};

export default Main;
