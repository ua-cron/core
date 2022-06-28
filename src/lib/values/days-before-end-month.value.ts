import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class DaysBeforeEndMonthValue extends BaseValue {
  constructor(d: ConstructorParameters<typeof BaseValue>[0] = { values: [ConstantValue.EVERY] }) {
    super(d);
  }

  getMode(): Mode.DAYS_BEFORE_END_MONTH {
    return Mode.DAYS_BEFORE_END_MONTH;
  }

  clone(values?: string[]) {
    return new DaysBeforeEndMonthValue(values ? { values } : this);
  }
}
