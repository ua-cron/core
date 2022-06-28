import { SegmentContainers, Containers } from './../types';
import { Segment } from './../enums';
import {
  SecondsContainer,
  MinutesContainer,
  HoursContainer,
  MonthContainer,
  DayOfMonthContainer,
  DayOfWeekContainer,
  YearContainer
} from './../segment-containers';

export class ViewData {
  readonly [Segment.seconds]: SecondsContainer;
  readonly [Segment.minutes]: MinutesContainer;
  readonly [Segment.hours]: HoursContainer;
  readonly [Segment.month]: MonthContainer;
  readonly [Segment.dayOfMonth]: DayOfMonthContainer;
  readonly [Segment.dayOfWeek]: DayOfWeekContainer;
  readonly [Segment.year]: YearContainer;

  constructor(d: {
    [Segment.seconds]: ConstructorParameters<typeof SecondsContainer>[0],
    [Segment.minutes]: ConstructorParameters<typeof MinutesContainer>[0],
    [Segment.hours]: ConstructorParameters<typeof HoursContainer>[0],
    [Segment.month]: ConstructorParameters<typeof MonthContainer>[0],
    [Segment.dayOfMonth]: ConstructorParameters<typeof DayOfMonthContainer>[0],
    [Segment.dayOfWeek]: ConstructorParameters<typeof DayOfWeekContainer>[0],
    [Segment.year]: ConstructorParameters<typeof YearContainer>[0]
  }) {
    this.seconds = new SecondsContainer(d.seconds);
    this.minutes = new MinutesContainer(d.minutes);
    this.hours = new HoursContainer(d.hours);
    this.month = new MonthContainer(d.month);
    this.dayOfMonth = new DayOfMonthContainer(d.dayOfMonth);
    this.dayOfWeek = new DayOfWeekContainer(d.dayOfWeek);
    this.year = new YearContainer(d.year);
  }

  set(container: Containers) {
    const segment = container.getSegment();
    return new ViewData({
      ...this,
      [segment]: container
    });
  }

  get<T extends Segment>(segment: T) {
    return this[segment].clone() as SegmentContainers<T>;
  }

  getSelected() {
    const secondsValue = this[Segment.seconds].getSelected();
    const minutesValue = this[Segment.minutes].getSelected();
    const hoursValue = this[Segment.hours].getSelected();
    const monthValue = this[Segment.month].getSelected();
    const dayOfMonthValue = this[Segment.dayOfMonth].getSelected();
    const dayOfWeekValue = this[Segment.dayOfWeek].getSelected();
    const yearValue = this[Segment.year].getSelected();

    return {
      [Segment.seconds]: secondsValue || undefined,
      [Segment.minutes]: minutesValue || undefined,
      [Segment.hours]: hoursValue || undefined,
      [Segment.month]: monthValue || undefined,
      [Segment.dayOfMonth]: dayOfMonthValue || undefined,
      [Segment.dayOfWeek]: dayOfWeekValue || undefined,
      [Segment.year]: yearValue || undefined
    };
  }
}
