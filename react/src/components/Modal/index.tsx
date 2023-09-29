import { Dialog, DialogHeader } from '../UI';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { FC, useState } from 'react';

export type Position = {
  xRate: number;
  yRate: number;
};

export type ModalId = 'creation' | 'details';

const Modal: FC<{
  children: JSX.Element[] | JSX.Element;
  modalId: ModalId;
  position: Position;
  close: () => void;
}> = ({ modalId, children, close, position }) => {
  const [currentPosition, setCurrentPosition] = useState<Position>(position);

  const onDrag = (_: DraggableEvent, data: DraggableData) => {
    setCurrentPosition({ xRate: data.lastX, yRate: data.lastY });
  };

  return (
    <Draggable
      handle=".draggable-header"
      position={{
        x: currentPosition.xRate,
        y: currentPosition.yRate,
      }}
      onDrag={onDrag}
    >
      <Dialog open>
        <div className="modal-dialog">
          <DialogHeader close={close} modalId={modalId} />
          {children}
        </div>
      </Dialog>
    </Draggable>
  );
};

export default Modal;
