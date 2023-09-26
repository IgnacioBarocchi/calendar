import { Button } from '../UI';
import Modal from '../Modal';
import { RootState } from '../../store/@types';
import { useSelector } from 'react-redux';

const EventCreationModal = () => {
  const eventCerationModalIsOpen = useSelector(
    (state: RootState) => state.eventCerationModalIsOpen,
  );
  if (!eventCerationModalIsOpen) return null;

  return (
    <Modal modalId={'creation'}>
      <form id="event-creation-form">
        <div id="event-creation-form-fields">
          <div className="event-creation-form-column">
            <label htmlFor="event-title">
              Add a title
              <input type="text" id="event-title" name="event-title" required />
            </label>

            <label htmlFor="start-datetime">
              Start Date and Time
              <input
                type="datetime-local"
                id="start-datetime"
                name="start-datetime"
                required
              />
            </label>

            <label htmlFor="end-datetime">
              End Date and Time
              <input
                type="datetime-local"
                id="end-datetime"
                name="end-datetime"
                required
              />
            </label>
          </div>

          <div className="event-creation-form-column">
            <label htmlFor="event-description">Add Description</label>
            <textarea
              id="event-description"
              name="event-description"
            ></textarea>
          </div>
        </div>
        <div className="event-creation-modal-footer">
          <Button type="button" id="create-event-button">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EventCreationModal;
