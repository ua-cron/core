import { Segment } from './../enums';
import {
  EveryValue,
  AndValue,
  IncrementValue,
  RangeValue,
  NoneValue,
  LastDayValue,
  LastDayWeekValue,
  LastNthDayWeekValue,
  NthWeekdayOfMonthValue,
  DaysBeforeEndMonthValue,
  NearestWeekdayOfMonthValue
} from './../values';

type Common = EveryValue|AndValue|IncrementValue|RangeValue;
type SegmentValueMap = {
  [Segment.seconds]: Common,
  [Segment.minutes]: Common,
  [Segment.hours]: Common,
  [Segment.year]: Common,
  [Segment.month]: Common|NoneValue,
  [Segment.dayOfMonth]: Common|NoneValue|LastDayValue|NearestWeekdayOfMonthValue|DaysBeforeEndMonthValue|LastDayWeekValue,
  [Segment.dayOfWeek]: Common|NthWeekdayOfMonthValue|LastNthDayWeekValue|NoneValue
}

export type SegmentValue<T extends Segment> = SegmentValueMap[T];
