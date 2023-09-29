import styled, { css } from 'styled-components';

export const Pressable = styled.button<{ border: boolean }>`
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.palette.foreground.primary};
  cursor: pointer;

  ${({ theme, border }) =>
    border
      ? css`
          border: 1px solid ${theme.palette.foreground.primary};
          padding: 4px;
          &:hover {
            background: ${theme.palette.foreground.primary};
            & span {
              color: ${theme.palette.background.primary};
            }
          }
        `
      : css`
          &:hover {
            & span {
              text-decoration: underline;
            }
          }
          border: none;
        `}
`;

export const TodayCircle = styled.div`
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.foreground.primary};
`;
