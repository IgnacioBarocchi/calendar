import styled, { css } from 'styled-components';

import { PressableContentProps } from './@types';

export const Pressable = styled.div<PressableContentProps>`
  outline: none;
  background: transparent;
  color: ${({ theme, brand }) =>
    brand ? theme.palette.brand : theme.palette.foreground.primary};
  cursor: pointer;
  display: flex;
  flex-direction: ${({ reversed }) => (reversed ? 'row-reverse' : 'row')};
  justify-content: ${({ reversed, safeSpace }) =>
    reversed ? 'flex-end' : `${safeSpace ? 'center' : 'normal'}`};
  align-items: center;

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

  width: ${({ theme, safeSpace }) =>
    safeSpace ? theme.size.todayButtonWidth : 'fit-content'};
  height: ${({ theme, safeSpace }) =>
    safeSpace ? theme.size.todayButtonHeight : 'fit-content'};
`;

export const TodayCircle = styled.div`
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.foreground.primary};
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownHeader = styled.div`
  cursor: pointer;
  color: red;
`;

export const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.palette.background.primary};
  border: 1px solid ${({ theme }) => theme.palette.foreground.primary};
  border-top: none;
  border-right: none;
  padding: 0;
  margin: 0;
  list-style: none;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-end;
`;

export const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
