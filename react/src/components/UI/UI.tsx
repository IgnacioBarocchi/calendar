import styled from 'styled-components';

export const TodayCircle = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
`;

export const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: red;
  font-size: 2rem;
`;
