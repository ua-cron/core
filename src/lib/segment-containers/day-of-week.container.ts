import { Segment } from './../enums';
import { DayOfWeekValues } from './../segment-values';
import { BaseContainer } from './base.abstract';

export class DayOfWeekContainer extends BaseContainer<Segment.dayOfWeek> {
  getSegment(): Segment.dayOfWeek {
    return Segment.dayOfWeek;
  }

  protected cloneWith(d: Pick<DayOfWeekContainer, 'selected'|'values'>) {
    return new DayOfWeekContainer(d) as this;
  }

  protected createValues(values: ConstructorParameters<typeof DayOfWeekValues>[0]) {
    return new DayOfWeekValues(values);
  }
}
