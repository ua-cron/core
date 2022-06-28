import { SegmentModes } from './../../types';
import { Segment } from './../../enums';
import { ViewData } from './../view-data.model';

export const getSegmentValues = <T extends Segment>(view: ViewData, segment: T, mode: SegmentModes<T>) => {
  const valueModel = view.get(segment).values.get(mode);
  if (!valueModel) {
    throw `No value found in segment: ${segment} by mode: ${mode}`;
  }
  return valueModel.get();
};
