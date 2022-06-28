import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class LastNthDayWeekValue extends BaseValue {
  constructor(d: ConstructorParameters<typeof BaseValue>[0] = { values: [ConstantValue.EVERY] }) {
    super(d);
  }

  getMode(): Mode.LAST_NTH_DAY_WEEK {
    return Mode.LAST_NTH_DAY_WEEK;
  }

  clone(values?: string[]) {
    return new LastNthDayWeekValue(values ? { values } : this);
  }
}
