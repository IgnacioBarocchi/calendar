export default class ClockHand {
  render() {
    const today = new Date();
    startingTimeSlot = document.querySelector(
      `[data-slot-index="${today.getDay()}-${today.getHours()}"]`
    );

    if (!startingTimeSlot) return;
    const startingMinutes = today.getMinutes();
    const hourPixels = startingTimeSlot.offsetHeight;
    const secondPiexels = hourPixels / 60 / 60;
    const oClockTimePosition = startingTimeSlot.offsetTop;
    const minutesPosition =
      (startingMinutes * hourPixels) / 60 - startingMinutes;
    let y = oClockTimePosition + minutesPosition;
    const clockHandElement = document.querySelector("#clock-hand");
    clockHandElement.style.left = startingTimeSlot.offsetLeft + "px";
    const render = () => {
      window.setInterval(() => {
        y = y + secondPiexels;
        clockHandElement.style.top = y + "px";
      }, 1000);
    };
  }
}

// convert to singletone
export const ClockHandComponent = new ClockHand();

/*
class Foo {
  constructor(msg) {

    if (Foo.singleton) {
      return Foo.singleton;
    }

    this.msg = msg;
    Foo.singleton = this;
    return Foo.singleton;
  }
}
We test:

const f = new Foo('blah');
const d = new Foo('nope');
console.log(f); // => Foo { msg: 'blah' }
console.log(d); // => Foo { msg: 'blah' }
*/

/*
class MyClass {
  constructor() {
    if (MyClass._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    MyClass._instance = this;

    // ... Your rest of the constructor code goes after this
  }
}

var instanceOne = new MyClass() // Executes succesfully
var instanceTwo = new MyClass() // Throws error
*/
