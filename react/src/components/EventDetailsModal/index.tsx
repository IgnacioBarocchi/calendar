import { ActionTypes, RootState } from '../../store/@types';
import { deleteEventById, getWeekEvents } from '../../services/events.service';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { DetailsView } from './EventDetailsModalElements';
import Modal from '../Modal';

const EventDetailsModal = () => {
  const dispatch = useDispatch();

  const {
    week,
    eventDetailsModalState: { isOpen, position, calendarEventRecord },
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
        calendarEventRecord: {},
      },
    });
  };

  useEffect(() => {
    const dispatchNewEvents = async () => {
      dispatch({
        type: ActionTypes.SET_WEEK_EVENTS,
        payload: await getWeekEvents(week),
      });

      setShouldFetchEvents(false);
    };

    if (shouldFetchEvents) {
      dispatchNewEvents();
    }
  }, [shouldFetchEvents]);

  if (!isOpen || !calendarEventRecord) return null;

  const handleDeleteEvent = async (): Promise<void> => {
    const response = await deleteEventById(calendarEventRecord.id);
    if (response) {
      dispatch({
        type: ActionTypes.DELETE_EVENT,
        payload: calendarEventRecord,
      });
      closeModal();
      setShouldFetchEvents(true);
    }
  };
  return (
    <Modal modalId={'details'} close={closeModal} position={position}>
      <DetailsView
        record={calendarEventRecord}
        handleDeleteEvent={handleDeleteEvent}
      />
    </Modal>
  );
};

export default EventDetailsModal;
