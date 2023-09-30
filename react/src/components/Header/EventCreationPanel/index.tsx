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
      <Dropdown options={['Create event']} onSelect={handleOpenModal} />
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
          dispatch({ type: ActionTypes.TOGGLE_THEME });
        }}
      />
    </EventCreationPanelContainer>
  );
};

export default EventCreationPanel;
