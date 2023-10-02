import { FC } from 'react';
import { FaCircle } from 'react-icons/fa';
import styled from 'styled-components';

const HandStick = styled.div<ClockHandElementsProps>`
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  z-index: 400;
  position: absolute;
  height: 3px;
  width: 100px;
  color: red;
`;

const HandPoint = styled(FaCircle)<ClockHandElementsProps>`
  top: ${({ top }) => top};
  left: ${({ left }) => left};
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
      <HandStick top={top} left={left} />
      <HandPoint top={top} left={left} />
    </>
  );
};

interface ClockHandElementsProps {
  top: number;
  left: number;
}
