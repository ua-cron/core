import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class EveryValue extends BaseValue {
  constructor() {
    super({
      values: Object.freeze([ConstantValue.EVERY])
    });
  }

  getMode(): Mode.EVERY {
    return Mode.EVERY;
  }

  clone() {
    return new EveryValue();
  }
}
