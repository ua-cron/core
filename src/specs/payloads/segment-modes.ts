import { Segment, Mode } from '@lib/enums';

export const commonModes = () => [Mode.AND, Mode.EVERY, Mode.INCREMENT, Mode.RANGE];
const commonAndNone = [...commonModes(), Mode.NONE];

export const allModes = () => [
  ...commonAndNone,
  Mode.LAST_DAY,
  Mode.NEAREST_WEEKDAY_OF_MONTH,
  Mode.DAYS_BEFORE_END_MONTH,
  Mode.LAST_DAY_WEEK,
  Mode.NTH_WEEKDAY_OF_MONTH,
  Mode.LAST_NTH_DAY_WEEK
];

export const segmentsModes = (): [Segment, Mode[]][] => [
  [Segment.seconds, commonModes()],
  [Segment.minutes, commonModes()],
  [Segment.hours, commonModes()],
  [Segment.year, commonModes()],
  [Segment.month, commonAndNone],
  [Segment.dayOfMonth, [
    ...commonAndNone,
    Mode.LAST_DAY,
    Mode.NEAREST_WEEKDAY_OF_MONTH,
    Mode.DAYS_BEFORE_END_MONTH,
    Mode.LAST_DAY_WEEK
  ]],
  [Segment.dayOfWeek, [
    ...commonAndNone,
    Mode.NTH_WEEKDAY_OF_MONTH,
    Mode.LAST_NTH_DAY_WEEK
  ]]
];

export const segmentsModesMap = () => segmentsModes().reduce((a, [segment, modes]) => ({ ...a, [segment]: modes }), {} as { [prop in Segment]: Mode[] });
