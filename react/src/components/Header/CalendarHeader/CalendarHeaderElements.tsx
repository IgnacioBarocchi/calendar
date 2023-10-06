import { CalendarCell, Text } from '../../UI';

import { FC } from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

export const CalendarHeaderRowGrid = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  grid-template-columns: ${({ theme }) => theme.size.timeCellWidth} 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

export const DateNumberContainer = styled(Text)<{
  today: boolean;
}>`
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

export const FoldedEventContainer = styled(Marquee)<{ shouldRender: boolean }>`
  padding: 4px;
  border-radius: 4px;
  width: 90%;
  visibility: ${({ shouldRender }) => (shouldRender ? 'auto' : 'hidden')};
  background: ${({ theme }) => theme.palette.brandVariant};
`;

export const FoldedEventText = styled.span`
  width: 100%;
  color: ${({ theme }) => theme.palette.background.primary};
`;

export const DayOfWeekItem: FC<{
  weekDay: string;
  dateNumber: number;
  today: boolean;
  folderEventText?: string;
}> = ({ weekDay, dateNumber, today, folderEventText }) => {
  return (
    <CalendarCell location={'header-row'}>
      <WeekDayDetailsContainer>
        <Text size="m" weight="bold">
          {weekDay}
        </Text>
        <DateNumberContainer today={today}>
          <Text size="m">{dateNumber}</Text>
        </DateNumberContainer>

        <FoldedEventContainer shouldRender={!!folderEventText}>
          <FoldedEventText>{folderEventText}</FoldedEventText>
        </FoldedEventContainer>
      </WeekDayDetailsContainer>
    </CalendarCell>
  );
};

export const TimeZoneOffsetItem = () => {
  return (
    <CalendarCell location={'header-row'}>
      <Text size="m" weight="bold">
        {
          { 480: 'UTC-8', 0: 'UTC', 180: 'UTC+3' }[
            Math.abs(new Date().getTimezoneOffset())
          ]
        }
      </Text>
    </CalendarCell>
  );
};
