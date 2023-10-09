import {
  Actions,
  closeModal,
  eventIsValid,
  formReducer,
  parseDateRecordValue,
  postCalendarEvent,
} from './helper';
import { CalendarEvent, DraftEvent, RootState } from '../../store/@types';
import { ChangeEvent, ChangeEventHandler, useReducer } from 'react';
import {
  DateFields,
  DateTimeField,
  DescriptionField,
  Form,
  FormColumn,
  FormFooter,
  TitleField,
} from './EventCreationModalElements';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../UI';
import Modal from '../Modal';

const EventCreationModal = () => {
  const dispatch = useDispatch();

  const {
    week,
    eventCerationModalState: { isOpen, initialFormValues, position },
  } = useSelector((state: RootState) => ({
    eventCerationModalState: state.eventCerationModalState,
    week: state.week,
  }));

  const [formData, dispatchFormData] = useReducer<
    (state: DraftEvent, action: Actions) => DraftEvent
  >(formReducer, initialFormValues as DraftEvent);

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
    if (!isOpen) return;
    try {
      //? get default values from useRef in this release.
      // todo: 2nd release => pick fixed values from dropdown

      const calendarEvent: CalendarEvent = {
        ...formData,
        start:
          formData.start instanceof Date
            ? parseDateRecordValue(formData.start)
            : parseDateRecordValue(initialFormValues.start),
        end:
          formData.end instanceof Date
            ? parseDateRecordValue(formData.end)
            : parseDateRecordValue(initialFormValues.end),
        type: 'upcoming',
      } as unknown as CalendarEvent;

      if (
        eventIsValid(
          calendarEvent.title,
          calendarEvent.start,
          calendarEvent.end,
        )
      ) {
        postCalendarEvent(calendarEvent, dispatch, week);
      }
    } catch (error) {
      // todo: use toast of something
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      modalId={'creation'}
      close={() => closeModal(dispatch)}
      position={position}
    >
      <Form>
        <FormColumn>
          <TitleField value={formData?.title} handler={handleInputChange} />
          <DateFields>
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
          </DateFields>
        </FormColumn>

        <FormColumn>
          <DescriptionField
            value={formData?.description}
            handler={handleInputChange}
          />
          <FormFooter>
            <Button onClick={handleSubmit} label="Save" border={true} />
          </FormFooter>
        </FormColumn>
      </Form>
    </Modal>
  );
};

export default EventCreationModal;
