import { FC } from 'react';
import styled from 'styled-components';

export const CalendarHeaderRowGrid = styled.div`
  grid-area: calendar-header;
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const CalendarHeaderCell = styled.div`
  border: ${({ theme }) => '1px solid' + theme.tertiary};
  padding: 10px;
  text-align: center;
  &first-child: {
    background: linear-gradient(red, red) 50% 50% / calc(100% - 2px)
        calc(100% - 2px) no-repeat,
      linear-gradient(90deg, transparent 0%, blue 100%);
    border: none;
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

export const DateNumberContainer = styled.div<{ today: boolean }>`
  font-size: 2rem;
  background-color: ${({ today }) => `${today ? 'red' : 'blue'}`};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

export const DetailSlot = styled.div``;

export const DayOfWeekItem: FC<{
  weekDay: string;
  dateNumber: number;
  today: boolean;
}> = ({ weekDay, dateNumber, today }) => {
  return (
    <CalendarHeaderCell>
      <WeekDayDetailsContainer>
        <DayName>{weekDay}</DayName>
        <DateNumberContainer today={today}>
          <span>{dateNumber}</span>
        </DateNumberContainer>
      </WeekDayDetailsContainer>
      <DetailSlot>
        <span>holiday?event?</span>
      </DetailSlot>
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
