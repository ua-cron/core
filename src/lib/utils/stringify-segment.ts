import { BaseValue } from './../values';
import { Mode, CronType } from './../enums';
import { getSeparator, containsSeparator } from './../utils';

export const stringifySegment = (v: BaseValue, cronType: CronType) => {
  const mode = v.getMode();
  if (containsSeparator(mode)) {
    const values = [...v.values];
    if (mode === Mode.INCREMENT && cronType === CronType.UNIX) {
      values[0] = '*';
    }
    return values.join(getSeparator(mode));
  }
  return v.values.join('');
}
