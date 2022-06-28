import { Mode, ConstantValue } from './../enums';
import { BaseValue } from './base.abstract';

export class AndValue extends BaseValue {
  constructor(d: ConstructorParameters<typeof BaseValue>[0] = { values: [ConstantValue.EVERY] }) {
    super(d);
  }

  getMode(): Mode.AND {
    return Mode.AND;
  }

  clone(values?: string[]) {
    return new AndValue(values ? { values } : this);
  }
}
