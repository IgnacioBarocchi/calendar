const getModalPosition = (clientPosition, modal) => {
  const [x, y] = clientPosition;

  const maxLeft = window.innerWidth - modal.offsetWidth;
  const maxTop = window.innerHeight - modal.offsetHeight;

  return [Math.min(Math.max(0, x), maxLeft), Math.min(Math.max(0, y), maxTop)];
};

export const render = (position, modal) => {
  const [left, top] = getModalPosition(position, modal);
  modal.showModal();
  modal.style.top = top + "px";
  modal.style.left = left + "px";
};
