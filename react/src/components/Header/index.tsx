import CalendarHeaderRow from './CalendarHeader';
import EventCreationPanel from './EventCreationPanel';
import Logo from './Logo';
import { RootState } from '../../store/@types';
import WeekViewNavigationBar from './WeekViewNavigationBar';
import styled from 'styled-components';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HeaderContainer = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.size.headerHeight};
  position: fixed;
  top: 0;
  z-index: 4;
  background: ${({ theme }) => theme.palette.background.primary};
  display: grid;
  /*grid-template-columns: 0.2fr 1fr;*/
  grid-template-columns: ${({ theme }) =>
    `${theme.size.asideWidth} calc(100vw - ${theme.size.asideWidth})`};
  grid-template-rows: 0.5fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    'logo navigation'
    'create-event calendar-header';
`;

const Header = () => {
  const { t, i18n } = useTranslation();
  const { week, holidays } = useSelector((state: RootState) => ({
    week: state.week,
    holidays: state.holidays,
  }));

  const weekWithHolidays = useMemo(() => {
    if (!week?.length || !holidays?.length) return;

    return week.map((date) => ({
      date,
      holiday: holidays.find((h) => {
        return h.date === date.toISOString().substring(0, 10);
      }),
    }));
  }, [week, holidays]);

  return (
    <HeaderContainer>
      <Logo gridArea={'logo'} />
      <WeekViewNavigationBar
        month={new Intl.DateTimeFormat(t('locale'), { month: 'long' }).format(
          week[6],
        )}
        gridArea={'navigation'}
      />
      <EventCreationPanel gridArea={'create-event'} />
      <CalendarHeaderRow
        week={week}
        gridArea={'calendar-header'}
        weekWithHolidays={weekWithHolidays}
      />
    </HeaderContainer>
  );
};
export default Header;
