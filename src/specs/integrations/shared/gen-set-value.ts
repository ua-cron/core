import { Segment, Type, Mode } from '@lib/enums';

import { Action } from './action.enum';
import { getSegment } from './get-segment';

export const genSetValue = (type: Type, mode: Mode, value: string[], segment?: Segment) => {
  if (type === Type.DAY && !segment) {
    throw `${type} segment should be present`;
  }
  segment = segment || getSegment(type);
  return {
    action: Action.SET_VALUE,
    segment,
    type,
    mode,
    value
  };
}
