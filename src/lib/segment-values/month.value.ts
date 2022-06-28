import { Mode, Segment } from './../enums';
import { NoneValue } from './../values';
import { SegmentValues } from './base.type';
import { BaseValues } from './base.abstract';

type Values = SegmentValues<Segment.month>;

export class MonthValues extends BaseValues<Segment.month> implements Values {
  protected readonly segment = Segment.month;
  override readonly [Mode.NONE] = new NoneValue();

  clone(d: Partial<Values> = {}) {
    return new MonthValues({
      ...this,
      ...d
    });
  }
}
