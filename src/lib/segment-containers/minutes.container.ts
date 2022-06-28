import { Segment } from './../enums';
import { MinutesValues } from './../segment-values';
import { BaseContainer } from './base.abstract';

export class MinutesContainer extends BaseContainer<Segment.minutes> {
  getSegment(): Segment.minutes {
    return Segment.minutes;
  }

  protected cloneWith(d: Pick<MinutesContainer, 'selected'|'values'>) {
    return new MinutesContainer(d) as this;
  }

  protected createValues(values: ConstructorParameters<typeof MinutesValues>[0]) {
    return new MinutesValues(values);
  }
}
