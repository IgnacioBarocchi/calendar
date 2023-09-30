import styled, { css } from 'styled-components';

export const Pressable = styled.div<{ border: boolean }>`
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.palette.foreground.primary};
  cursor: pointer;
  display: flex;
  flex-direction: row;
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
  color: white;
`;

export const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 0;
  margin: 0;
  list-style: none;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

export const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
