import { Mode, Segment } from './../enums';

type Common = Mode.AND|Mode.EVERY|Mode.INCREMENT|Mode.RANGE;

type SegmentModesMap = {
  [Segment.seconds]: Common,
  [Segment.minutes]: Common,
  [Segment.hours]: Common,
  [Segment.year]: Common,
  [Segment.month]: Common|Mode.NONE,
  [Segment.dayOfMonth]: Common|Mode.NONE|Mode.LAST_DAY|Mode.NEAREST_WEEKDAY_OF_MONTH|Mode.DAYS_BEFORE_END_MONTH|Mode.LAST_DAY_WEEK,
  [Segment.dayOfWeek]: Common|Mode.NONE|Mode.NTH_WEEKDAY_OF_MONTH|Mode.LAST_NTH_DAY_WEEK
};

export type SegmentCommonModes = Common;
export type SegmentModes<T extends Segment> = SegmentModesMap[T];
