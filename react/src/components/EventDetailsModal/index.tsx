import { ActionTypes, RootState } from '../../store/@types';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { deleteEventById, getWeekEvents } from '../../services/events.service';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../UI';
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

  const handleDeleteEvent: MouseEventHandler<HTMLButtonElement> = (async (
    event: MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    event.preventDefault();

    const response = await deleteEventById(eventId);
    alert(response);
    if (response) {
      alert('ok');
      dispatch({ type: ActionTypes.DELETE_EVENT, payload: eventId });
      closeModal();
      setShouldFetchEvents(true);
    }
  }) as unknown as MouseEventHandler<HTMLButtonElement>;

  return (
    <Modal modalId={'details'} close={closeModal}>
      <Button onClick={handleDeleteEvent}>
        <FaTrash />
      </Button>
    </Modal>
  );
};

export default EventDetailsModal;
