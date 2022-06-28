import { Mode, Segment } from './../enums';
import { SegmentModes } from './../types';

export const commonAcceptedMode = (mode: Mode): mode is SegmentModes<Segment.seconds|Segment.minutes|Segment.hours|Segment.year> => [
  Mode.AND,
  Mode.RANGE,
  Mode.INCREMENT,
  Mode.EVERY
].includes(mode);

export const dayOfMonthAcceptedMode = (mode: Mode): mode is SegmentModes<Segment.dayOfMonth> => commonAcceptedMode(mode) || [
  Mode.NONE,
  Mode.LAST_DAY,
  Mode.NEAREST_WEEKDAY_OF_MONTH,
  Mode.DAYS_BEFORE_END_MONTH,
  Mode.LAST_DAY_WEEK
].includes(mode);

export const dayOfWeekAcceptedMode = (mode: Mode): mode is SegmentModes<Segment.dayOfWeek> => commonAcceptedMode(mode) || [
  Mode.NONE,
  Mode.NTH_WEEKDAY_OF_MONTH,
  Mode.LAST_NTH_DAY_WEEK
].includes(mode);

export const monthAcceptedMode = (mode: Mode): mode is SegmentModes<Segment.month> => commonAcceptedMode(mode) || mode === Mode.NONE;
