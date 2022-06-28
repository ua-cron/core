import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class LastDayValue extends BaseValue {
  constructor() {
    super({
      values: Object.freeze([ConstantValue.LAST_DAY])
    });
  }

  getMode(): Mode.LAST_DAY {
    return Mode.LAST_DAY;
  }

  clone() {
    return new LastDayValue();
  }
}
