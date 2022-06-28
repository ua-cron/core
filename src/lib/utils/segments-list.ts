import { Segment } from './../enums';

export const getSegmentsList = () => [
  Segment.seconds,
  Segment.minutes,
  Segment.hours,
  Segment.dayOfMonth,
  Segment.month,
  Segment.dayOfWeek,
  Segment.year
];
