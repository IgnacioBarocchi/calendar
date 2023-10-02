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
