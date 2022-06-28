import { Segment } from './../enums';
import { SegmentValues } from './base.type';
import { BaseValues } from './base.abstract';

type Values = SegmentValues<Segment.minutes>;

export class MinutesValues extends BaseValues<Segment.minutes> implements Values {
  protected readonly segment = Segment.minutes;

  clone(d: Partial<Values> = {}) {
    return new MinutesValues({
      ...this,
      ...d
    });
  }
}
