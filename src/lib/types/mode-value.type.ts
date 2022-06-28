import { Mode } from './../enums';
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

type ModeValuesMap = {
  [Mode.AND]: AndValue,
  [Mode.EVERY]: EveryValue,
  [Mode.INCREMENT]: IncrementValue,
  [Mode.RANGE]: RangeValue,
  [Mode.NONE]: NoneValue,
  [Mode.DAYS_BEFORE_END_MONTH]: DaysBeforeEndMonthValue,
  [Mode.LAST_DAY]: LastDayValue,
  [Mode.LAST_DAY_WEEK]: LastDayWeekValue,
  [Mode.LAST_NTH_DAY_WEEK]: LastNthDayWeekValue,
  [Mode.NEAREST_WEEKDAY_OF_MONTH]: NearestWeekdayOfMonthValue,
  [Mode.NTH_WEEKDAY_OF_MONTH]: NthWeekdayOfMonthValue,
}

export type ModeValues<T extends Mode> = ModeValuesMap[T];
