import { Segment } from './../enums';
import { DayOfMonthValues } from './../segment-values';
import { BaseContainer } from './base.abstract';

export class DayOfMonthContainer extends BaseContainer<Segment.dayOfMonth> {
  getSegment(): Segment.dayOfMonth {
    return Segment.dayOfMonth;
  }

  protected cloneWith(d: Pick<DayOfMonthContainer, 'selected'|'values'>) {
    return new DayOfMonthContainer(d) as this;
  }

  protected createValues(values: ConstructorParameters<typeof DayOfMonthValues>[0]) {
    return new DayOfMonthValues(values);
  }
}
