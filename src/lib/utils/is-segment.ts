import { Segment } from './../enums';

export const isCommonSegment = (segment: Segment): segment is Segment.seconds|Segment.minutes|Segment.hours|Segment.year => {
  return [Segment.minutes, Segment.seconds, Segment.hours, Segment.year].includes(segment);
};
