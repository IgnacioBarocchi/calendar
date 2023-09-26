import styled from 'styled-components';

export const Form = styled.form`
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.bgPrimary};
  border-radius: 4px;
`;

export const FormFields = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

export const FormColumn = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
`;

export const FormFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  width: 96%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 4px;
  background: ${({ theme }) => theme.tertiary};
  color: ${({ theme }) => theme.primary};
`;

export const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 4px;
  background: ${({ theme }) => theme.tertiary};
  color: ${({ theme }) => theme.primary};
`;
