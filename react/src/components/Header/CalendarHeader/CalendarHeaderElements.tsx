import { CalendarCell, TextBig } from '../../UI';

import { FC } from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

export const CalendarHeaderRowGrid = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const CalendarHeaderCell = styled(CalendarCell)`
  border-top: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    border-left: none;
  }
`;

export const WeekDayDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  justify-content: space-around;
  align-content: center;
  align-items: center;
}
`;

export const DayName = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

export const DateNumberContainer = styled(TextBig)<{ today: boolean }>`
  background: ${({ theme, today }) =>
    `${today ? theme.palette.brand : theme.palette.background.primary}`};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

export const FoldedEventContainer = styled(Marquee)`
  padding: 4px;
  border-radius: 4px;
  width: 90%;
`;

export const FoldedEventText = styled.span<{ shouldRender: boolean }>`
  background: ${({ theme }) => theme.palette.background.primary};
  visibility: ${({ shouldRender }) => (shouldRender ? 'auto' : 'hidden')};
  width: 100%;
`;

export const DayOfWeekItem: FC<{
  weekDay: string;
  dateNumber: number;
  today: boolean;
  folderEventText?: string;
}> = ({ weekDay, dateNumber, today, folderEventText }) => {
  return (
    <CalendarHeaderCell>
      <WeekDayDetailsContainer>
        <DayName>{weekDay}</DayName>
        <DateNumberContainer today={today}>
          <span>{dateNumber}</span>
        </DateNumberContainer>

        {/* //todo: remove redundant logic */}
        <FoldedEventContainer>
          {folderEventText && (
            <FoldedEventText shouldRender={!!folderEventText}>
              {folderEventText}
            </FoldedEventText>
          )}
        </FoldedEventContainer>
      </WeekDayDetailsContainer>
    </CalendarHeaderCell>
  );
};

export const TimeZoneOffsetItem = () => {
  return (
    <CalendarHeaderCell>
      <DayName>
        {
          { 480: 'UTC-8', 0: 'UTC', 180: 'UTC+3' }[
            Math.abs(new Date().getTimezoneOffset())
          ]
        }
      </DayName>
    </CalendarHeaderCell>
  );
};
