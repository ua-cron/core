import { Mode, Separator, ConstantValue } from './../enums';

export const detectMode = (str: string) => {
  if (str.includes('L-')) {
    return Mode.DAYS_BEFORE_END_MONTH;
  }
  if (str.includes(Separator.AND)) {
    return Mode.AND;
  }
  if (str.includes(Separator.RANGE)) {
    return Mode.RANGE;
  }
  if (str === ConstantValue.LAST_DAY) {
    return Mode.LAST_DAY;
  }
  if (str === ConstantValue.LAST_DAY_WEEK) {
    return Mode.LAST_DAY_WEEK;
  }
  if (str.match(/[0-9]{1}L/i)) {
    return Mode.LAST_NTH_DAY_WEEK;
  }
  if (str.endsWith('W')) {
    return Mode.NEAREST_WEEKDAY_OF_MONTH;
  }
  if (str.includes(Separator.INCREMENT)) {
    return Mode.INCREMENT;
  }
  if (str.includes(Separator.NTH_WEEKDAY_OF_MONTH)) {
    return Mode.NTH_WEEKDAY_OF_MONTH;
  }
  if (str.includes(ConstantValue.EVERY)) {
    return Mode.EVERY;
  }
  if (str === ConstantValue.NONE) {
    return Mode.NONE;
  }
  return Mode.AND;
}
