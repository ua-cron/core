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

type SegmentContainersMap = {
  [Segment.seconds]: SecondsContainer,
  [Segment.minutes]: MinutesContainer,
  [Segment.hours]: HoursContainer,
  [Segment.year]: YearContainer,
  [Segment.month]: MonthContainer,
  [Segment.dayOfMonth]: DayOfMonthContainer,
  [Segment.dayOfWeek]: DayOfWeekContainer
};

export type SegmentContainers<T extends Segment> = SegmentContainersMap[T];
