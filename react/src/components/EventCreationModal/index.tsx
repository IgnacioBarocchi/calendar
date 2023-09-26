import {
  Form,
  FormColumn,
  FormFields,
  FormFooter,
  Input,
  Label,
  Textarea,
} from './EventCreationModal';
import { eventIsValid, formReducer } from './helper';

import { Button } from '../UI';
import Modal from '../Modal';
import { RootState } from '../../store/@types';
import { nanoid } from 'nanoid';
import { useReducer } from 'react';
import { useSelector } from 'react-redux';

// Define an initial state for the form

const EventCreationModal = () => {
  const [formData, dispatch] = useReducer(formReducer, {
    title: '',
    start: '',
    end: '',
    description: '',
  });

  const eventCerationModalIsOpen = useSelector(
    (state: RootState) => state.eventCerationModalIsOpen,
  );

  if (!eventCerationModalIsOpen) return null;

  // todo:
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  // };

  const handleSubmit = () => {
    try {
      // Validate the form data
      if (eventIsValid(formData.title, formData.start, formData.end)) {
        const calendarEvent = {
          id: nanoid(),
          title: formData.title,
          type: 'draft',
          description: formData.description,
          start: new Date(formData.start),
          end: new Date(formData.end),
        };

        console.log(calendarEvent);

        //  todo: dispatch close modal
        //  todo: dispatch save event
      }
    } catch (error) {
      // todo: use toast of something
      console.error(error);
    }
  };

  return (
    <Modal modalId={'creation'}>
      <Form>
        <FormFields id="event-creation-form-fields">
          <FormColumn className="event-creation-form-column">
            <Label htmlFor="event-title">
              Add a title
              <Input
                type="text"
                id="event-title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
              />
            </Label>

            <Label htmlFor="start-datetime">
              Start Date and Time
              <Input
                type="datetime-local"
                id="start-datetime"
                name="start"
                required
                value={formData.start}
                onChange={handleInputChange}
              />
            </Label>

            <Label htmlFor="end-datetime">
              End Date and Time
              <Input
                type="datetime-local"
                id="end-datetime"
                name="end"
                required
                value={formData.end}
                onChange={handleInputChange}
              />
            </Label>
          </FormColumn>

          <FormColumn className="event-creation-form-column">
            <Label>Add Description</Label>
            <Textarea
              id="event-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></Textarea>
          </FormColumn>
        </FormFields>
        <FormFooter>
          <Button type="button" id="create-event-button" onClick={handleSubmit}>
            Save
          </Button>
        </FormFooter>
      </Form>
    </Modal>
  );
};

export default EventCreationModal;
