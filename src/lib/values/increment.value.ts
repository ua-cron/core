import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class IncrementValue extends BaseValue {
  constructor(d: ConstructorParameters<typeof BaseValue>[0] = { values: [ConstantValue.EVERY] }) {
    super(d);
  }

  getMode(): Mode.INCREMENT {
    return Mode.INCREMENT;
  }

  clone(values?: string[]) {
    return new IncrementValue(values ? { values } : this);
  }
}
