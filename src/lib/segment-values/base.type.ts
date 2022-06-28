import { SegmentModes, ModeValues } from './../types';
import { Segment } from './../enums';

export type SegmentValues<T extends Segment> = {
  readonly [prop in SegmentModes<T>]: ModeValues<prop>;
};
