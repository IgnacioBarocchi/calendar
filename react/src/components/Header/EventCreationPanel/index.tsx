import { EventCreationPanelContainer } from './EventCreationPanelElements';
import { FC } from 'react';

const EventCreationPanel: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <EventCreationPanelContainer gridArea={gridArea}>
      x
    </EventCreationPanelContainer>
  );
};

export default EventCreationPanel;
