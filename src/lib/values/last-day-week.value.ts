import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class LastDayWeekValue extends BaseValue {
  constructor() {
    super({
      values: Object.freeze([ConstantValue.LAST_DAY_WEEK])
    });
  }

  getMode(): Mode.LAST_DAY_WEEK {
    return Mode.LAST_DAY_WEEK;
  }

  clone() {
    return new LastDayWeekValue();
  }
}
