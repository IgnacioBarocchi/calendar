import Dropdown, { Button } from '../../UI';

import { ActionTypes } from '../../../store/@types';
import { EventCreationPanelContainer } from './EventCreationPanelElements';
import { FC } from 'react';
import { getDefaultDateTimeValue } from '../../EventCreationModal/helper';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const EventCreationPanel: FC<{ gridArea: string }> = ({ gridArea }) => {
  const { t, i18n } = useTranslation();

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
      <Dropdown
        options={['Create event', 'Focus time']}
        onSelect={handleOpenModal}
      />
      <Button
        label={t('language.label')}
        size="m"
        onClick={() => {
          i18n.changeLanguage(t('language.key'));
        }}
      />
      <Button
        label={t('tlgTheme')}
        size="m"
        onClick={() => {
          dispatch({ type: ActionTypes.TOGGLE_THEME });
        }}
      />
    </EventCreationPanelContainer>
  );
};

export default EventCreationPanel;
