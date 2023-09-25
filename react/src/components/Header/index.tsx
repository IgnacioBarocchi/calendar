import CalendarHeaderRow from './CalendarHeader';
import EventCreationPanel from './EventCreationPanel';
import { HEADER_HEIGHT } from '../../constants/theme';
import Logo from './Logo';
import WeekViewNavigationBar from './WeekViewNavigationBar';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT};
  position: fixed;
  top: 0;
  z-index: 4;
  background: ${({ theme }) => theme.bgPrimary};
  border-bottom: 1px solid red;
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
  return (
    <HeaderContainer>
      <Logo gridArea={'logo'} />
      <WeekViewNavigationBar gridArea={'navigation'} />
      <EventCreationPanel gridArea={'create-event'} />
      <CalendarHeaderRow gridArea={'calendar-header'} />
    </HeaderContainer>
  );
};
export default Header;
