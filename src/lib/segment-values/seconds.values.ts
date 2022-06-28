import { Segment } from './../enums';
import { SegmentValues } from './base.type';
import { BaseValues } from './base.abstract';

type Values = SegmentValues<Segment.seconds>;

export class SecondsValues extends BaseValues<Segment.seconds> implements Values {
  protected readonly segment = Segment.seconds;

  clone(d: Partial<Values> = {}) {
    return new SecondsValues({
      ...this,
      ...d
    });
  }
}
