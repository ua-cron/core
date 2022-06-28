import { Segment } from './../enums';
import { HoursValues } from './../segment-values';
import { BaseContainer } from './base.abstract';

export class HoursContainer extends BaseContainer<Segment.hours> {
  getSegment(): Segment.hours {
    return Segment.hours;
  }

  protected cloneWith(d: Pick<HoursContainer, 'selected'|'values'>) {
    return new HoursContainer(d) as this;
  }

  protected createValues(values: ConstructorParameters<typeof HoursValues>[0]) {
    return new HoursValues(values);
  }
}
