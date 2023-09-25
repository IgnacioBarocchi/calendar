import CalendarHeaderRow from './CalendarHeader';
import Logo from './Logo';
import WeekViewNavigationBar from './WeekViewNavigationBar';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  height: var(--header-height);
  position: fixed;
  top: 0;
  z-index: 4;
  background: var(--background-brand-primary);
  border-bottom: 1px solid var(--color-brand-tertiary);
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
      <Logo />
      <WeekViewNavigationBar />
      <CalendarHeaderRow />
    </HeaderContainer>
  );
};
export default Header;
