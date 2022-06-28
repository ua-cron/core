import { Segment, Type, Mode } from '@lib/enums';
import { Action } from './action.enum';

export type Change = {
  segment: Segment,
  type: Type,
  mode: Mode,
  action: Action,
  value: string[]
};
