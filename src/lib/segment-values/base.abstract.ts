import { commonAcceptedMode, dayOfWeekAcceptedMode, dayOfMonthAcceptedMode, monthAcceptedMode } from './../utils';
import {
  AndValue,
  EveryValue,
  RangeValue,
  IncrementValue,
  NoneValue,
  NthWeekdayOfMonthValue,
  LastNthDayWeekValue,
  LastDayValue,
  LastDayWeekValue,
  DaysBeforeEndMonthValue,
  NearestWeekdayOfMonthValue
} from './../values';
import { SegmentModes, ModeValues, SegmentCommonModes } from './../types';
import { Segment, Mode } from './../enums';
import { SegmentValues } from './base.type';

type Inputs = Partial<SegmentValues<Segment.seconds|Segment.minutes|Segment.hours|Segment.year>>;

export abstract class BaseValues<T extends Segment> {
  protected abstract readonly segment: T;
  readonly [Mode.EVERY] = new EveryValue();
  readonly [Mode.AND]: AndValue;
  readonly [Mode.RANGE]: RangeValue;
  readonly [Mode.INCREMENT]: IncrementValue;
  readonly [Mode.NONE]: T extends Segment.month|Segment.dayOfMonth|Segment.dayOfWeek ? NoneValue : undefined;
  readonly [Mode.LAST_NTH_DAY_WEEK]: T extends Segment.dayOfWeek ? LastNthDayWeekValue : undefined;
  readonly [Mode.NTH_WEEKDAY_OF_MONTH]: T extends Segment.dayOfWeek ? NthWeekdayOfMonthValue : undefined;
  readonly [Mode.LAST_DAY]: T extends Segment.dayOfMonth ? LastDayValue : undefined;
  readonly [Mode.NEAREST_WEEKDAY_OF_MONTH]: T extends Segment.dayOfMonth ? NearestWeekdayOfMonthValue : undefined;
  readonly [Mode.DAYS_BEFORE_END_MONTH]: T extends Segment.dayOfMonth ? DaysBeforeEndMonthValue : undefined;
  readonly [Mode.LAST_DAY_WEEK]: T extends Segment.dayOfMonth ? LastDayWeekValue : undefined;

  constructor(d: Inputs = {}) {
    this.AND = new AndValue(d.AND);
    this.RANGE = new RangeValue(d.RANGE);
    this.INCREMENT = new IncrementValue(d.INCREMENT);
  }

  abstract clone(d?: Partial<this>): SegmentValues<T>;

  get<K extends SegmentModes<Segment.dayOfMonth>>(mode: K): T extends Segment.dayOfMonth ? ModeValues<K> : null;
  get<K extends SegmentModes<Segment.dayOfWeek>>(mode: K): T extends Segment.dayOfWeek ? ModeValues<K> : null;
  get<K extends SegmentModes<Segment.month>>(mode: K): T extends Segment.month ? ModeValues<K> : null;
  get<K extends SegmentCommonModes>(mode: K): ModeValues<K>;
  get<K extends Mode>(mode: K): ModeValues<K>|null;
  get(mode: Mode) {
    const value = this[mode];
    if (this.segment === Segment.dayOfMonth && dayOfMonthAcceptedMode(mode)) {
      return value ? value.clone() : null;
    } else if (this.segment === Segment.dayOfWeek && dayOfWeekAcceptedMode(mode)) {
      return value ? value.clone() : null;
    } else if (this.segment === Segment.month && monthAcceptedMode(mode)) {
      return value ? value.clone() : null;
    } else if (commonAcceptedMode(mode)) {
      return value ? value.clone() : null;
    }
    return null;
  }
}
