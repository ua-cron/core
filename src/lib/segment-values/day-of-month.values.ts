import { Mode, Segment } from './../enums';
import {
  NoneValue,
  LastDayValue,
  LastDayWeekValue,
  DaysBeforeEndMonthValue,
  NearestWeekdayOfMonthValue
} from './../values';
import { SegmentValues } from './base.type';
import { BaseValues } from './base.abstract';

type Values = SegmentValues<Segment.dayOfMonth>;

export class DayOfMonthValues extends BaseValues<Segment.dayOfMonth> implements Values {
  protected readonly segment = Segment.dayOfMonth;

  override readonly [Mode.NONE] = new NoneValue();
  override readonly [Mode.LAST_DAY] = new LastDayValue();
  override readonly [Mode.LAST_DAY_WEEK] = new LastDayWeekValue();
  override readonly [Mode.NEAREST_WEEKDAY_OF_MONTH]: NearestWeekdayOfMonthValue;
  override readonly [Mode.DAYS_BEFORE_END_MONTH]: DaysBeforeEndMonthValue;

  constructor (d: Partial<Values> = {}) {
    super(d);
    this.NEAREST_WEEKDAY_OF_MONTH = new NearestWeekdayOfMonthValue(d.NEAREST_WEEKDAY_OF_MONTH);
    this.DAYS_BEFORE_END_MONTH = new DaysBeforeEndMonthValue(d.DAYS_BEFORE_END_MONTH);
  }

  clone(d: Partial<this> = {}) {
    return new DayOfMonthValues({
      ...this,
      ...d
    });
  }
}
