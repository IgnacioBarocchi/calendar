const ClockHand = () => {
  const today = new Date();
  const startingTimeSlot = document.querySelector(
    `[data-slot-index="${today.getDay()}-${today.getHours()}"]`
  );

  if (!startingTimeSlot) return;
  const startingMinutes = today.getMinutes();
  const hourPixels = startingTimeSlot.offsetHeight;
  const oClockTimePosition = startingTimeSlot.offsetTop;
  const minutesPosition = (startingMinutes * hourPixels) / 60 - startingMinutes;
  let y = oClockTimePosition + minutesPosition;
  const clockHandElement = document.querySelector("#clock-hand");
  clockHandElement.style.left = startingTimeSlot.offsetLeft + "px";
  const render = () => {
    window.setInterval(() => {
      y++;
      clockHandElement.style.top = y + "px";
    }, 1000);
  };

  return { render };
};

export default ClockHand;
