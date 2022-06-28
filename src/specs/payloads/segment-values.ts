import {
  SecondsValues,
  MinutesValues,
  HoursValues,
  YearValues,
  MonthValues,
  DayOfMonthValues,
  DayOfWeekValues
} from '@lib/segment-values';
import { Segment } from '@lib/enums';

export const segmentValues = () => ({
  [Segment.seconds]: SecondsValues,
  [Segment.minutes]: MinutesValues,
  [Segment.hours]: HoursValues,
  [Segment.year]: YearValues,
  [Segment.month]: MonthValues,
  [Segment.dayOfMonth]: DayOfMonthValues,
  [Segment.dayOfWeek]: DayOfWeekValues
});
