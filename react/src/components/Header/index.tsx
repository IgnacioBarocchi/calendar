import styled, { css } from 'styled-components';

import CalendarHeaderRow from './CalendarHeader';
import EventCreationPanel from './EventCreationPanel';
import Logo from './Logo';
import { RootState } from '../../store/@types';
import WeekViewNavigationBar from './WeekViewNavigationBar';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { weekWithHolidaysSelector } from '../../store/selectors';

const HeaderContainer = styled.header<{ asideIsHidden: boolan }>`
  width: 100%;
  height: ${({ theme }) => theme.size.headerHeight};
  position: fixed;
  top: 0;
  z-index: 4;
  background: ${({ theme }) => theme.palette.background.primary};
  display: grid;
  grid-template-columns: ${({ theme, asideIsHidden }) =>
    `${asideIsHidden ? 0 : theme.size.asideWidth} calc(100vw - ${
      theme.size.asideWidth
    })`};
  grid-template-rows: 0.5fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    'logo navigation'
    'create-event calendar-header';
`;

const Header = () => {
  const { t } = useTranslation();
  const { week, weekWithHolidays, asideIsHidden } = useSelector(
    (state: RootState) => ({
      week: state.week,
      weekWithHolidays: weekWithHolidaysSelector(state),
      asideIsHidden: state.asideIsHidden,
    }),
  );

  return (
    <HeaderContainer asideIsHidden={asideIsHidden}>
      <Logo gridArea="logo" />
      <WeekViewNavigationBar
        month={new Intl.DateTimeFormat(t('locale'), { month: 'long' }).format(
          week[6],
        )}
        year={week[6].getFullYear()}
        gridArea={'navigation'}
      />
      {asideIsHidden ? null : <EventCreationPanel gridArea={'create-event'} />}
      <CalendarHeaderRow
        week={week}
        gridArea={'calendar-header'}
        weekWithHolidays={weekWithHolidays}
        asideIsHidden={asideIsHidden}
      />
    </HeaderContainer>
  );
};

export default Header;
