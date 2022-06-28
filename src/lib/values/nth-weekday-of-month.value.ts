import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class NthWeekdayOfMonthValue extends BaseValue {
  constructor(d: ConstructorParameters<typeof BaseValue>[0] = { values: [ConstantValue.EVERY] }) {
    super(d);
  }

  getMode(): Mode.NTH_WEEKDAY_OF_MONTH {
    return Mode.NTH_WEEKDAY_OF_MONTH;
  }

  clone(values?: string[]) {
    return new NthWeekdayOfMonthValue(values ? { values } : this);
  }
}
