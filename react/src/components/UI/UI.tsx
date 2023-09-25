import { HEADER_HEIGHT } from '../../constants/theme';
import styled from 'styled-components';

export const TodayCircle = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
`;

export const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
`;

export const CalendarCell = styled.div`
  color: ${({ theme }) => theme.primary};
  border: ${({ theme }) => '1px solid' + theme.tertiary};
  background: ${({ theme }) => theme.bgPrimary};
  padding: 10px;
  text-align: center;
  height: cal(${HEADER_HEIGHT} / 2);
  &first-child: {
    background: ${({ theme }) => `
      linear-gradient(${theme.primary}, ${theme.primary}) 50% 50% / calc(100% - 2px)
      calc(100% - 2px) no-repeat,
      linear-gradient(90deg, transparent 0%, ${theme.tertiary} 100%);
      border: none;
    `};
  }
`;

export const TextBig = styled.span`
  color: ${({ theme }) => theme.primary};
`;
