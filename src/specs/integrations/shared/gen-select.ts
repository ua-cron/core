import { Mode, Type, Segment } from '@lib/enums';

import { Action } from './action.enum';
import { getSegment } from './get-segment';

export const genSelect = (type: Type, mode: Mode, segment?: Segment) => {
  segment = segment || getSegment(type);
  return {
    value: [],
    action: Action.SELECT,
    segment,
    type,
    mode
  }
}
