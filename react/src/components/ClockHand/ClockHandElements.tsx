import { ClockHandData } from './helper';
import { FC } from 'react';
import { FaCircle } from 'react-icons/fa';
import styled from 'styled-components';

const HandPoint = styled(FaCircle)`
  color: ${({ theme }) => theme.palette.foreground.secondary};
`;

const HandStick = styled.div<{ width: number }>`
  height: 2px;
  width: ${({ width }) => width - 10}px;
  background: ${({ theme }) => theme.palette.foreground.secondary};
`;

const PartsWrapper = styled.div<{
  top: number;
  left: number;
  animationDuration: number;
}>`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 3;
  left: ${({ left }) => left - 7}px;
  top: ${({ top }) => {
    /* alert(top); */
    return top;
  }}px;
`;

// const moveVertically = (top: number) => keyframes`
//   0% {
//     top: ${top}px;
//   }
//   100% {
//     top: ${top + (window.innerHeight + top)}px;
//     display: none;
//   }
// `;

/* animation-name: ${({ top }) => moveVertically(top - 7)};
  animation-duration: ${({ animationDuration }) => `${animationDuration}`}s;
  animation-timing-function: linear; */

export const ClockHandContainer: FC<ClockHandProps> = ({ clockHandData }) => {
  const {
    position: { top, left },
    width,
    animationDuration,
  } = clockHandData;

  return (
    <PartsWrapper top={top} left={left} animationDuration={animationDuration}>
      <HandPoint />
      <HandStick width={width} />
    </PartsWrapper>
  );
};

interface ClockHandProps {
  clockHandData: ClockHandData;
}
// !before
/* 
import { FC } from 'react';
import { FaCircle } from 'react-icons/fa';
import styled from 'styled-components';

const HandStick = styled.div<ClockHandElementsProps>`
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 3;
  position: absolute;
  height: 2px;
  width: ${({ width }) => width}px;
  background: red;
`;

const HandPoint = styled(FaCircle)<ClockHandElementsProps>`
  top: ${({ top }) => top - 7}px;
  left: ${({ left }) => left - 7}px;
  z-index: 3;
  position: absolute;
  color: red;
`;

export const ClockHandContainer: FC<ClockHandElementsProps> = ({
  top,
  left,
  width,
}) => {
  return (
    <>
      <HandPoint top={top} left={left} />
      <HandStick top={top} left={left} width={width} />
    </>
  );
};

interface ClockHandElementsProps {
  top: number;
  left: number;
}
*/
