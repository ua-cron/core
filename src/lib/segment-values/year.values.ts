import { Segment } from './../enums';
import { SegmentValues } from './base.type';
import { BaseValues } from './base.abstract';

type Values = SegmentValues<Segment.year>;

export class YearValues extends BaseValues<Segment.year> implements Values {
  protected readonly segment = Segment.year;

  clone(d: Partial<Values> = {}) {
    return new YearValues({
      ...this,
      ...d
    });
  }
}
