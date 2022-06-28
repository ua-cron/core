import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class RangeValue extends BaseValue {
  constructor(d: ConstructorParameters<typeof BaseValue>[0] = { values: [ConstantValue.EVERY] }) {
    super(d);
  }

  getMode(): Mode.RANGE {
    return Mode.RANGE;
  }

  clone(values?: string[]) {
    return new RangeValue(values ? { values } : this);
  }
}
