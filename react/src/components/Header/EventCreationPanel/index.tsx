import { FC, useMemo, useRef } from 'react';

import Dropdown from '../../UI';
import { EventCreationPanelContainer } from './EventCreationPanelElements';
import { desktopGeneric } from '../../../constants/theme';
import { getDefaultDateTimeValue } from '../../EventCreationModal/helper';
import { updateEventCreationModalState } from '../../../store/actions';
import { useDispatch } from 'react-redux';

const EventCreationPanel: FC<{ gridArea: string }> = ({ gridArea }) => {
  const dispatch = useDispatch();
  const panelRef = useRef(null);

  const position = useMemo(() => {
    return {
      xRate:
        (Number(desktopGeneric.size.asideWidth.replace('vw', '')) *
          window.innerWidth) /
        100,
      yRate:
        (Number(desktopGeneric.size.headerHeight.replace('vh', '')) *
          window.innerHeight) /
        100 /
        1.618,
    };
  }, []);

  const handleOpenModal = () => {
    dispatch(
      updateEventCreationModalState(
        {
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
        true,
      ),
    );
  };
  return (
    <EventCreationPanelContainer ref={panelRef} gridArea={gridArea}>
      <Dropdown
        options={['Create event', 'Focus time']}
        onSelect={handleOpenModal}
      />
    </EventCreationPanelContainer>
  );
};

export default EventCreationPanel;
