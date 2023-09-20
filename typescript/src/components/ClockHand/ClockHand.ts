export default class ClockHand {
  private static instance: ClockHand | null = null;

  private startingTimeSlot: HTMLElement;
  private clockHandElement: HTMLElement;
  private secondPixels: number;

  constructor(startingTimeSlot: HTMLElement) {
    this.startingTimeSlot = startingTimeSlot;
    this.clockHandElement = document.querySelector('#clock-hand')!;
    this.secondPixels = this.calculateSecondPixels();
    this.startTick();
  }

  public static getInstance(startingTimeSlot: HTMLElement): ClockHand {
    if (!ClockHand.instance) {
      ClockHand.instance = new ClockHand(startingTimeSlot);
    }
    return ClockHand.instance;
  }

  public getTodayEvents() {}

  private calculateSecondPixels() {
    const hourPixels = this.getStartSlotHeight();
    return hourPixels / 60 / 60;
  }

  private getStartSlotHeight() {
    return this.startingTimeSlot.offsetHeight;
  }

  startTick() {
    const startingMinutes = new Date().getMinutes();
    const oClockTimePosition = this.getStartSlotOffsetTop();
    const minutesPosition =
      (startingMinutes * this.getStartSlotHeight()) / 60 - startingMinutes;
    let y = oClockTimePosition + minutesPosition;

    this.clockHandElement.style.left = this.getStartSlotOffsetLeft() + 'px';
    this.clockHandElement.style.width =
      this.startingTimeSlot.offsetWidth + 'px';

    setInterval(() => {
      y += this.secondPixels;
      this.clockHandElement.style.top = y + 'px';
    }, 1000);
  }

  private getStartSlotOffsetTop() {
    return this.startingTimeSlot.offsetTop;
  }

  private getStartSlotOffsetLeft() {
    return this.startingTimeSlot.offsetLeft;
  }
}
