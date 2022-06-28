import { NoneValue, NthWeekdayOfMonthValue, LastNthDayWeekValue } from './../values';
import { Mode, Segment } from './../enums';
import { SegmentValues } from './base.type';
import { BaseValues } from './base.abstract';

type Values = SegmentValues<Segment.dayOfWeek>;

export class DayOfWeekValues extends BaseValues<Segment.dayOfWeek> implements Values {
  protected readonly segment = Segment.dayOfWeek;

  override readonly [Mode.NONE] = new NoneValue();
  override readonly [Mode.NTH_WEEKDAY_OF_MONTH]: NthWeekdayOfMonthValue;
  override readonly [Mode.LAST_NTH_DAY_WEEK]: LastNthDayWeekValue;

  constructor (d: Partial<Values> = {}) {
    super(d);
    this.NTH_WEEKDAY_OF_MONTH = new NthWeekdayOfMonthValue(d.NTH_WEEKDAY_OF_MONTH);
    this.LAST_NTH_DAY_WEEK = new LastNthDayWeekValue(d.LAST_NTH_DAY_WEEK);
  }

  clone(d: Partial<this> = {}) {
    return new DayOfWeekValues({
      ...this,
      ...d
    });
  }
}
