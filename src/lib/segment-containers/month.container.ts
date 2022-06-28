import { Segment } from './../enums';
import { MonthValues } from './../segment-values';
import { BaseContainer } from './base.abstract';

export class MonthContainer extends BaseContainer<Segment.month> {
  getSegment(): Segment.month {
    return Segment.month;
  }

  protected cloneWith(d: Pick<MonthContainer, 'selected'|'values'>) {
    return new MonthContainer(d) as this;
  }

  protected createValues(values: ConstructorParameters<typeof MonthValues>[0]) {
    return new MonthValues(values);
  }
}
