import Dropdown, { Button } from '../../UI';

import { ActionTypes } from '../../../store/@types';
import { EventCreationPanelContainer } from './EventCreationPanelElements';
import { FC } from 'react';
import { getDefaultDateTimeValue } from '../../EventCreationModal/helper';
import { useDispatch } from 'react-redux';

const EventCreationPanel: FC<{ gridArea: string }> = ({ gridArea }) => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch({
      type: ActionTypes.UPDATE_EVENT_CREATION_MODAL_STATE,
      payload: {
        isOpen: true,
        initialFormValues: {
          title: `no title ${new Date().getHours()}`,
          type: 'draft',
          start: getDefaultDateTimeValue(new Date()),
          end: getDefaultDateTimeValue(new Date(), true),
          description: '',
        },
      },
    });
  };
  return (
    <EventCreationPanelContainer gridArea={gridArea}>
      {/* <Button onClick={handleOpenModal} label="create event" /> */}

      <Dropdown
        options={['x', 'l']}
        onSelect={(v) => {
          alert(v);
        }}
      />
      <Button
        label="about"
        size="m"
        onClick={() => {
          console.log('x');
        }}
      />
      <Button
        label="toggle theme"
        size="m"
        onClick={() => {
          console.log('x');
        }}
      />
    </EventCreationPanelContainer>
  );
};

export default EventCreationPanel;
