import { FC } from 'react';
import { FaCircle } from 'react-icons/fa';
import styled from 'styled-components';

const HandStick = styled.div<ClockHandElementsProps>`
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 400;
  position: absolute;
  height: 30px;
  width: 100px;
  color: red;
`;

const HandPoint = styled(FaCircle)<ClockHandElementsProps>`
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 400;
  position: absolute;
  color: red;
`;

export const ClockHandContainer: FC<ClockHandElementsProps> = ({
  top,
  left,
}) => {
  return (
    <>
      <HandPoint top={top} left={left} />
      <HandStick top={top} left={left} />
    </>
  );
};

interface ClockHandElementsProps {
  top: number;
  left: number;
}
