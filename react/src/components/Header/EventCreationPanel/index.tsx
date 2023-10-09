import { FC, useMemo } from 'react';

import { ActionTypes } from '../../../store/@types';
import Dropdown from '../../UI';
import { EventCreationPanelContainer } from './EventCreationPanelElements';
import { desktopGeneric } from '../../../constants/theme';
import { getDefaultDateTimeValue } from '../../EventCreationModal/helper';
import { useDispatch } from 'react-redux';

const EventCreationPanel: FC<{ gridArea: string }> = ({ gridArea }) => {
  const dispatch = useDispatch();

  const position = useMemo(() => {
    return {
      xRate:
        (Number(desktopGeneric.size.asideWidth.replace('vw', '')) *
          window.innerWidth) /
        100,
      yRate:
        (Number(desktopGeneric.size.headerHeight.replace('vh', '')) *
          window.innerHeight) /
        100,
    };
  }, []);

  const handleOpenModal = () => {
    dispatch({
      type: ActionTypes.UPDATE_EVENT_CREATION_MODAL_STATE,
      payload: {
        isOpen: true,
        position,
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
      <Dropdown
        options={['Create event', 'Focus time']}
        onSelect={handleOpenModal}
      />
    </EventCreationPanelContainer>
  );
};

export default EventCreationPanel;
