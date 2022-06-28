import { Segment } from '@lib/enums';

export const commonSegments = () => [
  Segment.seconds,
  Segment.minutes,
  Segment.hours,
  Segment.year
];

export const segments = () => [
  Segment.seconds,
  Segment.minutes,
  Segment.hours,
  Segment.dayOfMonth,
  Segment.month,
  Segment.dayOfWeek,
  Segment.year
];

export const unixSegments = () => [
  Segment.minutes,
  Segment.hours,
  Segment.dayOfMonth,
  Segment.month,
  Segment.dayOfWeek
];
