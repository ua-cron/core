import {
  SecondsContainer,
  MinutesContainer,
  HoursContainer,
  YearContainer,
  MonthContainer,
  DayOfMonthContainer,
  DayOfWeekContainer
} from '@lib/segment-containers';
import { Segment } from '@lib/enums';

export const segmentContainers = () => [
  [Segment.seconds, SecondsContainer],
  [Segment.minutes, MinutesContainer],
  [Segment.hours, HoursContainer],
  [Segment.year, YearContainer],
  [Segment.month, MonthContainer],
  [Segment.dayOfMonth, DayOfMonthContainer],
  [Segment.dayOfWeek, DayOfWeekContainer]
] as const;

export const segmentContainerMap = () => ({
  [Segment.seconds]: SecondsContainer,
  [Segment.minutes]: MinutesContainer,
  [Segment.hours]: HoursContainer,
  [Segment.year]: YearContainer,
  [Segment.month]: MonthContainer,
  [Segment.dayOfMonth]: DayOfMonthContainer,
  [Segment.dayOfWeek]: DayOfWeekContainer
});
