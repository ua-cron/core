import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class NearestWeekdayOfMonthValue extends BaseValue {
  constructor(d: ConstructorParameters<typeof BaseValue>[0] = { values: [ConstantValue.EVERY] }) {
    super(d);
  }

  getMode(): Mode.NEAREST_WEEKDAY_OF_MONTH {
    return Mode.NEAREST_WEEKDAY_OF_MONTH;
  }

  clone(values?: string[]) {
    return new NearestWeekdayOfMonthValue(values ? { values } : this);
  }
}
