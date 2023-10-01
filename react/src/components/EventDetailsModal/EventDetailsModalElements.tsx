import { Button, Text } from '../UI';

import { CalendarEvent } from '../../store/@types';
import { FC } from 'react';
import styled from 'styled-components';

const DetailsViewContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding-left: 1rem;
  height: -webkit-fill-available;
  width: calc(100% - 1rem);
  position: absolute;
`;

export const DetailsView: FC<{
  record: CalendarEvent;
  handleDeleteEvent: MouseEvent;
}> = ({ record, handleDeleteEvent }) => {
  return (
    <DetailsViewContainer>
      <p>
        <Text size="l" weight="bold">
          {record.title}
        </Text>
        <Text size="m">
          {` - ${new Date(record.start).toLocaleString()} to ${new Date(
            record.end,
          ).toLocaleString()}`}
        </Text>
      </p>

      {record?.description && (
        <p>
          <Text size="m">{record.description}</Text>
        </p>
      )}
      <Button onClick={handleDeleteEvent} border={true} label="Delete" />
    </DetailsViewContainer>
  );
};
