import StorageService from '../StorageService/StorageService';

enum Stages {
  NEXT,
  PREV,
  ONGOING,
}

// I'd be easier to handle a read-only object const Stages = { ... } as const;
export default class NavigationControls {
  private static instance: NavigationControls | null = null;

  navigationIndex = 0;
  storage: any;
  header: any;
  calendarBody: any;
  calendarMonth: any;

  constructor(header: any, calendarBody: any, calendarMonth: any) {
    if (NavigationControls.instance) {
      return NavigationControls.instance;
    }
    this.header = header;
    this.calendarBody = calendarBody;
    this.calendarMonth = calendarMonth;
    NavigationControls.instance = this;
  }

  private incrementNavigationIndex() {
    this.navigationIndex++;
  }

  private decrementNavigationIndex() {
    this.navigationIndex--;
  }

  private resetNavigationIndex() {
    this.navigationIndex = 0;
  }

  private getDateOf(requestedWeekView: Stages) {
    debugger;
    const numberOfDaysToAdd = {
      [Stages[Stages.ONGOING]]: 0,
      [Stages[Stages.NEXT]]: 7,
      [Stages[Stages.PREV]]: -7,
    }[requestedWeekView];

    if (numberOfDaysToAdd === 0) return new Date();

    const referenceSunday = StorageService.getSelectedWeek()[0];

    return new Date(
      referenceSunday.setDate(referenceSunday.getDate() + numberOfDaysToAdd),
    );
  }

  private handleNavigationChange(requestedWeekView: Stages) {
    debugger;
    switch (requestedWeekView) {
      case Stages.ONGOING:
        this.resetNavigationIndex();
        break;
      case Stages.NEXT:
        this.incrementNavigationIndex();
        break;
      case Stages.PREV:
        this.decrementNavigationIndex();
        break;
    }

    StorageService.setSelectedWeek(
      this.getDateOf(requestedWeekView),
      this.navigationIndex,
    );

    this.reRenderControlledComponents();
  }

  private reRenderControlledComponents() {
    this.calendarMonth.calendarBodyElement.innerHTML = '';
    [this.header, this.calendarBody, this.calendarMonth].forEach(
      (component: any) => {
        component.render();
      },
    );
  }

  public navigateWithDaysOfMonth(date: Date) {
    const referenceSunday = StorageService.selectedWeek[0];

    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const sundayOfCurrentWeek = new Date(currentDate);
    sundayOfCurrentWeek.setDate(currentDate.getDate() + daysUntilSunday);

    const timeDiff = sundayOfCurrentWeek.getTime() - referenceSunday.getTime();
    const weekDiff = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));

    this.navigationIndex = this.navigationIndex + weekDiff;

    StorageService.setSelectedWeek(currentDate, this.navigationIndex);
    this.reRenderControlledComponents();
  }

  public navigateWithNavbar() {
    const keys: (keyof typeof Stages)[] = <(keyof typeof Stages)[]>(
      Object.keys(Stages).filter((value) => !Number.isInteger(Number(value)))
    );

    keys.forEach((requestedWeekView) => {
      const activeButton = document.querySelector(
        `#${String(requestedWeekView).toLowerCase()}-week`,
      );
      activeButton?.addEventListener('click', () =>
        this.handleNavigationChange(requestedWeekView),
      );
    });
  }

  public static getInstance(
    header?: any,
    calendarBody?: any,
    calendarMonth?: any,
  ): NavigationControls {
    if (!NavigationControls.instance) {
      if (header && calendarBody && calendarMonth) {
        NavigationControls.instance = new NavigationControls(
          header,
          calendarBody,
          calendarMonth,
        );
      } else {
        NavigationControls.instance = new NavigationControls();
      }
    }
    return NavigationControls.instance;
  }
}
