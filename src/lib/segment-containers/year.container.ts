import { Segment } from './../enums';
import { YearValues } from './../segment-values';
import { BaseContainer } from './base.abstract';

export class YearContainer extends BaseContainer<Segment.year> {
  getSegment(): Segment.year {
    return Segment.year;
  }

  protected cloneWith(d: Pick<YearContainer, 'selected'|'values'>) {
    return new YearContainer(d) as this;
  }

  protected createValues(values: ConstructorParameters<typeof YearValues>[0]) {
    return new YearValues(values);
  }
}
