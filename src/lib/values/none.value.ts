import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class NoneValue extends BaseValue {
  constructor() {
    super({
      values: Object.freeze([ConstantValue.NONE])
    });
  }

  getMode(): Mode.NONE {
    return Mode.NONE;
  }

  clone() {
    return new NoneValue();
  }
}
