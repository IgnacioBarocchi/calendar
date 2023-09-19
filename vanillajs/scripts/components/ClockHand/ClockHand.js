export default class ClockHand {
  startingTimeSlot;

  constructor(startingTimeSlot) {
    if (ClockHand.singleton) {
      return ClockHand.singleton;
    }

    ClockHand.singleton = this;
    this.startingTimeSlot = startingTimeSlot;
    this.clockHandElement = document.querySelector("#clock-hand");
    this.secondPixels = this.calculateSecondPixels();
    this.startTick();

    return ClockHand.singleton;
  }

  calculateSecondPixels() {
    const hourPixels = this._getStartSlotHeight();
    return hourPixels / 60 / 60;
  }

  _getStartSlotHeight() {
    return this.startingTimeSlot.offsetHeight;
  }

  startTick() {
    const startingMinutes = new Date().getMinutes();
    const oClockTimePosition = this._getStartSlotOffsetTop();
    const minutesPosition =
      (startingMinutes * this._getStartSlotHeight()) / 60 - startingMinutes;
    let y = oClockTimePosition + minutesPosition;

    this.clockHandElement.style.left =
      this._getStartSlotOffsetLeft() - 4 + "px";
    this.clockHandElement.style.width =
      this.startingTimeSlot.offsetWidth + "px";

    setInterval(() => {
      y += this.secondPixels;
      this.clockHandElement.style.top = y + "px";
    }, 1000);
  }

  _getStartSlotOffsetTop() {
    return this.startingTimeSlot.offsetTop;
  }

  _getStartSlotOffsetLeft() {
    return this.startingTimeSlot.offsetLeft;
  }
}
