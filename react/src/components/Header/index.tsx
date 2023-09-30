import CalendarHeaderRow from './CalendarHeader';
import EventCreationPanel from './EventCreationPanel';
import Logo from './Logo';
import { RootState } from '../../store/@types';
import WeekViewNavigationBar from './WeekViewNavigationBar';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const HeaderContainer = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.size.headerHeight};
  position: fixed;
  top: 0;
  z-index: 4;
  background: ${({ theme }) => theme.palette.background.primary};
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  grid-template-rows: 0.5fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    'logo navigation'
    'create-event calendar-header';
`;

const Header = () => {
  const week = useSelector((state: RootState) => state.week);

  return (
    <HeaderContainer>
      <Logo gridArea={'logo'} />
      <WeekViewNavigationBar
        month={new Intl.DateTimeFormat('en', { month: 'long' }).format(week[6])}
        gridArea={'navigation'}
      />
      <EventCreationPanel gridArea={'create-event'} />
      <CalendarHeaderRow week={week} gridArea={'calendar-header'} />
    </HeaderContainer>
  );
};
export default Header;
