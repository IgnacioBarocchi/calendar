import { ActionTypes, RootState } from '../../store/@types';
import { deleteEventById, getWeekEvents } from '../../services/events.service';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Button } from '../UI';
import { ButtonProps } from '../UI/@types';
import { FaTrash } from 'react-icons/fa';
import Modal from '../Modal';

const EventDetailsModal = () => {
  const dispatch = useDispatch();

  const {
    week,
    eventDetailsModalState: { isOpen, eventId },
  } = useSelector((state: RootState) => ({
    week: state.week,
    eventDetailsModalState: state.eventDetailsModalState,
  }));

  const [shouldFetchEvents, setShouldFetchEvents] = useState(false);

  const closeModal = () => {
    dispatch({
      type: ActionTypes.UPDATE_EVENT_DETAILS_MODAL_STATE,
      payload: {
        isOpen: false,
        eventId: '',
      },
    });
  };

  useEffect(() => {
    const dispatchNewEvents = async () => {
      dispatch({
        type: ActionTypes.FETCH_WEEK_EVENTS,
        payload: await getWeekEvents(week),
      });

      setShouldFetchEvents(false);
    };

    if (shouldFetchEvents) {
      dispatchNewEvents();
    }
  }, [shouldFetchEvents]);

  if (!isOpen || !eventId) return null;

  const handleDeleteEvent = async (): Promise<void> => {
    const response = await deleteEventById(eventId);
    if (response) {
      alert('ok');
      dispatch({ type: ActionTypes.DELETE_EVENT, payload: eventId });
      closeModal();
      setShouldFetchEvents(true);
    }
  };

  return (
    <Modal modalId={'details'} close={closeModal}>
      <Button
        onClick={handleDeleteEvent as ButtonProps['onClick']}
        Icon={FaTrash}
      />
    </Modal>
  );
};

export default EventDetailsModal;
