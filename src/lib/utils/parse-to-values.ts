import { Mode, Separator, ConstantValue } from './../enums';

export const parseToValues = (str: string, mode: Mode) => {
  const defaultValue = [str];
  if (Mode.DAYS_BEFORE_END_MONTH === mode) {
    return defaultValue;
  }
  if (Mode.INCREMENT === mode) {
    return str.split(Separator.INCREMENT);
  }
  if (Mode.AND === mode) {
    return str.split(Separator.AND).filter(value => !!value);
  }
  if (Mode.RANGE === mode) {
    return str.split(Separator.RANGE);
  }
  if (Mode.LAST_NTH_DAY_WEEK === mode) {
    return defaultValue;
  }
  if (Mode.NEAREST_WEEKDAY_OF_MONTH === mode) {
    return defaultValue;
  }
  if (Mode.NTH_WEEKDAY_OF_MONTH === mode) {
    return str.split(Separator.NTH_WEEKDAY_OF_MONTH);
  }
  if (Mode.EVERY === mode) {
    return [ConstantValue.EVERY];
  }
  if (Mode.NONE === mode) {
    return [ConstantValue.NONE];
  }
  if (Mode.LAST_DAY === mode) {
    return [ConstantValue.LAST_DAY];
  }
  if (Mode.LAST_DAY_WEEK === mode) {
    return [ConstantValue.LAST_DAY_WEEK];
  }
  return defaultValue;
}
