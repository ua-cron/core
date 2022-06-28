import { SegmentModes, SegmentValues, SegmentValue, ModeValues } from './../types';
import { Segment, Mode } from './../enums';

type ValuesInput<T extends Segment> = {
  readonly [prop in SegmentModes<T>]: ModeValues<prop>;
};

export abstract class BaseContainer<T extends Segment> {
  readonly selected: SegmentModes<T>;
  readonly values: SegmentValues<T>;

  constructor(d: {
    selected: SegmentModes<T>,
    values: Partial<ValuesInput<T>>
  }) {
    this.selected = d.selected;
    this.values = this.createValues(d.values);
  }

  getSelected() {
    return this.values.get(this.selected) as SegmentValue<T>|null;
  }

  select<K extends SegmentModes<T>>(mode: K): this;
  select(mode: Mode): this|null;
  select(mode: Mode) {
    const value = this.values.get(mode);
    if (!value) {
      return null;
    }
    return this.cloneWith({
      ...this,
      selected: value.getMode()
    });
  }

  setValues(values: Partial<ValuesInput<T>>) {
    return this.cloneWith({
      ...this,
      values: this.createValues({
        ...this.values,
        ...values
      })
    });
  }

  clone() {
    return this.cloneWith(this);
  }

  abstract getSegment(): T;
  protected abstract cloneWith(d: Pick<BaseContainer<T>, 'selected'|'values'>): this;
  protected abstract createValues(values: Partial<ValuesInput<T>>): SegmentValues<T>;
}
