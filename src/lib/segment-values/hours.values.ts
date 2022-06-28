import { Segment } from './../enums';
import { SegmentValues } from './base.type';
import { BaseValues } from './base.abstract';

type Values = SegmentValues<Segment.hours>;

export class HoursValues extends BaseValues<Segment.hours> implements Values {
  protected readonly segment = Segment.hours;

  clone(d: Partial<Values> = {}) {
    return new HoursValues({
      ...this,
      ...d
    });
  }
}
