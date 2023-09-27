import {
  ActionTypes,
  CalendarEvent,
  DraftEvent,
  RootState,
} from '../../store/@types';
import {
  Actions,
  eventIsValid,
  formReducer,
  parseDateRecordValue,
} from './helper';
import { ChangeEvent, ChangeEventHandler, useReducer } from 'react';
import {
  DateTimeField,
  DescriptionField,
  Form,
  FormColumn,
  FormFields,
  FormFooter,
  TitleField,
} from './EventCreationModal';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../UI';
import Modal from '../Modal';
import { postEvent } from '../../services/events.service';

const EventCreationModal = () => {
  const dispatch = useDispatch();

  const { isOpen, initialFormValues } = useSelector(
    (state: RootState) => state.eventCerationModalState,
  );

  const [formData, dispatchFormData] = useReducer<
    (state: DraftEvent, action: Actions) => DraftEvent
  >(formReducer, initialFormValues as DraftEvent);

  if (!isOpen) return null;

  const handleInputChange:
    | ChangeEventHandler<HTMLInputElement>
    | ChangeEventHandler<HTMLTextAreaElement> = (
    inputEvent: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!inputEvent.target) return;

    const { name, value } = inputEvent.target;
    const payload = ['end', 'start'].includes(name) ? new Date(value) : value;

    const action = {
      type: `SET_${name.toUpperCase()}`,
      payload,
    };

    dispatchFormData(action);
    console.log(formData);
  };

  const handleSubmit = () => {
    try {
      const parsedStartDateString = parseDateRecordValue(formData.start);
      const parsedEndDateString = parseDateRecordValue(formData.end);

      const shouldSubmit = eventIsValid(
        formData.title,
        parsedStartDateString,
        parsedEndDateString,
      );

      console.log(shouldSubmit, formData);

      if (shouldSubmit) {
        postEvent({
          ...formData,
          type: 'upcoming',
          start: parsedStartDateString,
          end: parsedEndDateString,
        } as CalendarEvent);

        dispatch({
          type: ActionTypes.UPDATE_EVENT_CREATION_MODAL_STATE,
          payload: {
            isOpen: false,
            initialFormValues: {
              title: '',
              type: 'draft',
              start: '',
              end: '',
              description: '',
            },
          },
        });
      }
    } catch (error) {
      // todo: use toast of something
      console.error(error);
    }
  };

  return (
    <Modal modalId={'creation'}>
      <Form>
        <FormFields>
          <FormColumn>
            <TitleField value={formData?.title} handler={handleInputChange} />
            <DateTimeField
              name={'start'}
              defaultValue={String(initialFormValues?.start)}
              value={formData?.start}
              handler={handleInputChange}
            />
            <DateTimeField
              name={'end'}
              defaultValue={String(initialFormValues?.end)}
              value={formData?.end}
              handler={handleInputChange}
            />
          </FormColumn>

          <FormColumn className="event-creation-form-column">
            <DescriptionField
              value={formData?.description}
              handler={handleInputChange}
            />
          </FormColumn>
        </FormFields>
        <FormFooter>
          <Button type="button" onClick={handleSubmit}>
            Save
          </Button>
        </FormFooter>
      </Form>
    </Modal>
  );
};

export default EventCreationModal;
