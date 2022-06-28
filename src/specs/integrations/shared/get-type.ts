import { Segment, Type } from '@lib/enums';

export const getType = (segment: Segment) => {
  if (segment === Segment.seconds) {
    return Type.SECONDS;
  } else if (segment === Segment.minutes) {
    return Type.MINUTES;
  } else if (segment === Segment.hours) {
    return Type.HOURS;
  } else if (segment === Segment.month) {
    return Type.MONTH;
  } else if (segment === Segment.year) {
    return Type.YEAR;
  }
  return Type.DAY;
};
