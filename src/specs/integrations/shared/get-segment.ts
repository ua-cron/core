import { Segment, Type } from '@lib/enums';

export const getSegment = (type: Type) => {
  let segment: Segment;
  if (type === Type.HOURS) {
    segment = Segment.hours;
  } else if (type === Type.MINUTES) {
    segment = Segment.minutes;
  } else if (type === Type.SECONDS) {
    segment = Segment.seconds;
  } else if (type === Type.MONTH) {
    segment = Segment.month;
  } else if (type === Type.YEAR) {
    segment = Segment.year;
  } else {
    throw `${type} not supported`;
  }
  return segment;
};
