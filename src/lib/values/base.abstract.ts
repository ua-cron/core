import { Mode } from './../enums';

export abstract class BaseValue {
  readonly values: readonly string[];

  constructor(d: { values: readonly string[] } = { values: [] }) {
    this.values = Object.freeze([...d.values]);
  }

  get() {
    return [...this.values];
  }

  abstract getMode(): Mode;
  abstract clone(values?: string[]): BaseValue;
}
