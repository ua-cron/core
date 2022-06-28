import {
  AndValue,
  NoneValue,
  RangeValue,
  EveryValue,
  LastDayValue,
  IncrementValue,
  LastDayWeekValue,
  LastNthDayWeekValue,
  NthWeekdayOfMonthValue,
  DaysBeforeEndMonthValue,
  NearestWeekdayOfMonthValue
} from '@lib/values';
import { Mode } from '@lib/enums';

export const valuesMode = () => ({
  [Mode.EVERY]: EveryValue,
  [Mode.RANGE]: RangeValue,
  [Mode.INCREMENT]: IncrementValue,
  [Mode.AND]: AndValue,
  [Mode.NONE]: NoneValue,
  [Mode.DAYS_BEFORE_END_MONTH]: DaysBeforeEndMonthValue,
  [Mode.LAST_DAY]: LastDayValue,
  [Mode.LAST_DAY_WEEK]: LastDayWeekValue,
  [Mode.LAST_NTH_DAY_WEEK]: LastNthDayWeekValue,
  [Mode.NEAREST_WEEKDAY_OF_MONTH]: NearestWeekdayOfMonthValue,
  [Mode.NTH_WEEKDAY_OF_MONTH]: NthWeekdayOfMonthValue
});
