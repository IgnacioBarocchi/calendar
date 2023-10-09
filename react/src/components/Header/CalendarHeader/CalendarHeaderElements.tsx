import { CalendarCell, Text } from '../../UI';
import ReactTextTransition, { presets } from 'react-text-transition';
import styled, { css } from 'styled-components';

import { FC } from 'react';
import { Fonts } from '../../../constants/theme';
import Marquee from 'react-fast-marquee';

export const CalendarHeaderRowGrid = styled.div<{
  gridArea: string;
  asideIsHidden: boolean;
}>`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.size.timeCellWidth} 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  ${({ gridArea, asideIsHidden }) => {
    // alert(asideIsHidden);
    if (asideIsHidden) {
      return css`
        width: 100vw;
        /* background: red; */
        /* opacity: 0.5; */
      `;
    }

    return css`
      grid-area: ${gridArea};
      /* background: green; */
    `;
  }};
`;

export const WeekDayDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  justify-content: space-around;
  align-content: center;
  align-items: center;
`;

export const DateNumberContainer = styled(Text)<{ today: boolean }>`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, today }) =>
    today ? theme.palette.brand : theme.palette.background.primary};
`;

export const FoldedEventContainer = styled(Marquee)<{ shouldRender: boolean }>`
  padding: 4px;
  border-radius: 4px;
  width: 90%;
  visibility: ${({ shouldRender }) => (shouldRender ? 'auto' : 'hidden')};
  background: ${({ theme }) => theme.palette.brandVariant};
  min-height: 1rem;
`;

export const FoldedEventText = styled(Text)`
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
        <Text size="l" font={Fonts.SupremeBold}>
          {weekDay}
        </Text>
        <DateNumberContainer today={today}>
          <ReactTextTransition springConfig={presets.slow} delay={200} inline>
            <Text fade={true} size="l" font={Fonts.SupremeBold}>
              {dateNumber}
            </Text>
          </ReactTextTransition>
        </DateNumberContainer>

        <FoldedEventContainer shouldRender={!!folderEventText}>
          <FoldedEventText font={Fonts.SupremeBoldItalic}>
            {folderEventText}
          </FoldedEventText>
        </FoldedEventContainer>
      </WeekDayDetailsContainer>
    </CalendarCell>
  );
};

export const TimeZoneOffsetItem = () => {
  return (
    <CalendarCell location={'header-row'}>
      <Text size="m" weight="bold" font={Fonts.SupremeBold}>
        {
          { 480: 'UTC-8', 0: 'UTC', 180: 'UTC+3' }[
            Math.abs(new Date().getTimezoneOffset())
          ]
        }
      </Text>
    </CalendarCell>
  );
};
