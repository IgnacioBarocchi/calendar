export type Position = Readonly<[number, number]>;

export default abstract class Modal {
  modalElement: HTMLElement;
  closeButtonElement: HTMLElement;
  draggableElement: HTMLElement;

  constructor(modalElement: HTMLElement, closeButtonElement: HTMLElement) {
    this.modalElement = modalElement;
    this.closeButtonElement = closeButtonElement;
    this.draggableElement = modalElement.querySelector('.draggable-header')!;

    this.closeButtonElement.addEventListener(
      'click',
      function () {
        // !remove this from here
        // !should be part of calendar event.
        document.querySelectorAll('.draft').forEach((draft) => {
          draft.remove();
        });
        // @ts-ignore
        this.hide();
      }.bind(this),
    );

    this.enableDraggin();
  }

  private enableDraggin() {
    let initX = 0,
      initY = 0,
      firstX = 0,
      firstY = 0;

    function dragIt(this: HTMLElement, e: MouseEvent) {
      if (!this.parentElement) return;
      this.parentElement.style.left = initX + e.pageX - firstX + 'px';
      this.parentElement.style.top = initY + e.pageY - firstY + 'px';
    }

    this.draggableElement.addEventListener(
      'mousedown',
      function (this: HTMLElement, e: MouseEvent) {
        e.preventDefault();
        const element = this;
        if (!element.parentElement) return;

        initX = element.parentElement.offsetLeft;
        initY = element.parentElement.offsetTop;
        firstX = e.pageX;
        firstY = e.pageY;

        element.addEventListener('mousemove', dragIt, false);

        window.addEventListener(
          'mouseup',
          function () {
            element.removeEventListener('mousemove', dragIt, false);
          },
          false,
        );
      },
      false,
    );
  }

  protected show(position: Position) {
    const [left, top] = this.getModalPosition(position);
    //   @ts-ignore
    this.modalElement.showModal();
    this.modalElement.style.top = top + 'px';
    this.modalElement.style.left = left + 'px';
  }

  protected hide() {
    //   @ts-ignore
    this.modalElement.close();
  }

  protected getModalPosition(clientPosition: Position) {
    const [x, y] = clientPosition;

    const maxLeft = window.innerWidth - this.modalElement.offsetWidth;
    const maxTop = window.innerHeight - this.modalElement.offsetHeight;

    return [
      Math.min(Math.max(0, x), maxLeft),
      Math.min(Math.max(0, y), maxTop),
    ];
  }
}
