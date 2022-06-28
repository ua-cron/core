import { Mode } from './../enums';
import { ModeValues } from './../types';
import {
  EveryValue,
  AndValue,
  IncrementValue,
  RangeValue,
  NoneValue,
  LastDayValue,
  LastDayWeekValue,
  LastNthDayWeekValue,
  NthWeekdayOfMonthValue,
  DaysBeforeEndMonthValue,
  NearestWeekdayOfMonthValue
} from './../values';

export function createValue<T extends Mode>(mode: T, values: string[]): ModeValues<T>;
export function createValue(mode: Mode, values: string[]) {
  const input = { values };
  if (mode === Mode.EVERY) {
    return new EveryValue();
  }
  if (mode === Mode.RANGE) {
    return new RangeValue(input);
  }
  if (mode === Mode.INCREMENT) {
    return new IncrementValue(input);
  }
  if (mode === Mode.AND) {
    return new AndValue(input);
  }
  if (mode === Mode.NONE) {
    return new NoneValue();
  }
  if (mode === Mode.DAYS_BEFORE_END_MONTH) {
    return new DaysBeforeEndMonthValue(input);
  }
  if (mode === Mode.LAST_DAY) {
    return new LastDayValue();
  }
  if (mode === Mode.LAST_DAY_WEEK) {
    return new LastDayWeekValue();
  }
  if (mode === Mode.LAST_NTH_DAY_WEEK) {
    return new LastNthDayWeekValue(input);
  }
  if (mode === Mode.NEAREST_WEEKDAY_OF_MONTH) {
    return new NearestWeekdayOfMonthValue(input);
  }
  if (mode === Mode.NTH_WEEKDAY_OF_MONTH) {
    return new NthWeekdayOfMonthValue(input);
  }
  throw `Unknown mode: ${mode}`;
}
