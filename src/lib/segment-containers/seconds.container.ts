import { Segment } from './../enums';
import { SecondsValues } from './../segment-values';
import { BaseContainer } from './base.abstract';

export class SecondsContainer extends BaseContainer<Segment.seconds> {
  getSegment(): Segment.seconds {
    return Segment.seconds;
  }

  protected cloneWith(d: Pick<SecondsContainer, 'selected'|'values'>) {
    return new SecondsContainer(d) as this;
  }

  protected createValues(values: ConstructorParameters<typeof SecondsValues>[0]) {
    return new SecondsValues(values);
  }
}
