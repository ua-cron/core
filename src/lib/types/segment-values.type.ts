import { Segment } from './../enums';
import {
  SecondsValues,
  MinutesValues,
  HoursValues,
  MonthValues,
  DayOfMonthValues,
  DayOfWeekValues,
  YearValues
} from './../segment-values';

type SegmentValuesMap = {
  [Segment.seconds]: SecondsValues,
  [Segment.minutes]: MinutesValues,
  [Segment.hours]: HoursValues,
  [Segment.year]: YearValues,
  [Segment.month]: MonthValues,
  [Segment.dayOfMonth]: DayOfMonthValues,
  [Segment.dayOfWeek]: DayOfWeekValues
}

export type SegmentValues<T extends Segment> = SegmentValuesMap[T];
