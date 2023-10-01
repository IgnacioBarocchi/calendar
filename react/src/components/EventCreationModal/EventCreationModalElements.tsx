import { ChangeEventHandler, FC } from 'react';

import { formatDateToDateInputValue } from './helper';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
`;

export const FormFields = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 50%;
`;

export const FormFooter = styled.footer`
  width: fit-content;
  align-self: end;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.palette.foreground.secondary};
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.background.secondary};
  color: ${({ theme }) => theme.palette.foreground.primary};
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.palette.foreground.secondary};
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.background.secondary};
  color: ${({ theme }) => theme.palette.foreground.primary};
`;

export const TitleField: FC<{
  value?: string;
  handler: ChangeEventHandler<HTMLInputElement>;
}> = ({ value, handler }) => {
  return (
    <Label htmlFor="event-title">
      Add a title
      <Input
        type="text"
        name="title"
        required
        value={value}
        onChange={handler}
      />
    </Label>
  );
};

export const DateFields = styled.div`
  width: 100%;
  display: flex;
`;

export const DateTimeField: FC<{
  defaultValue: string;
  value: Date;
  name: 'start' | 'end';
  handler: ChangeEventHandler<HTMLInputElement>;
}> = ({ defaultValue, value, name, handler }) => {
  return (
    <Label htmlFor={`${name}-datetime`}>
      {`${name === 'start' ? 'Start' : 'End'} Date and Time`}
      <Input
        type="datetime-local"
        name={name}
        required
        value={value ? formatDateToDateInputValue(value) : value}
        defaultValue={defaultValue}
        onChange={handler}
      />
    </Label>
  );
};

export const DescriptionField: FC<{
  value?: string;
  handler: ChangeEventHandler<HTMLInputElement>;
}> = ({ value, handler }) => {
  return (
    <Label htmlFor="event-description">
      Add Description
      <Textarea
        name="description"
        required
        value={value}
        onChange={handler as unknown as ChangeEventHandler<HTMLTextAreaElement>}
      />
    </Label>
  );
};
