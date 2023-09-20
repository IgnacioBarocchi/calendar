export type Position = Readonly<[number, number]>;

export default abstract class Modal {
  modalElement: HTMLElement;
  closeButtonElement: HTMLElement;

  constructor(modalElement: HTMLElement, closeButtonElement: HTMLElement) {
    this.modalElement = modalElement;
    this.closeButtonElement = closeButtonElement;

    this.closeButtonElement.addEventListener(
      'click',
      function () {
        // !remove this from here
        // !should be part of calendar event.
        document.querySelectorAll('.draft').forEach((draft) => {
          draft.remove();
        });
        this.hide();
      }.bind(this),
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
