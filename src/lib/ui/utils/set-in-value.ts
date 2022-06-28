import { SegmentModes } from './../../types';
import { createValue } from './../../utils';
import { Segment } from './../../enums';
import { ViewData } from './../view-data.model';
import { getSegmentValues } from './get-segment-value';

export const setInValue = <T extends Segment>(view: ViewData, mode: SegmentModes<T>, index: 0|1, value: string, segment: T) => {
  const segmentContainer = view.get(segment);
  const values = getSegmentValues(view, segment, mode);
  values[index] = value;

  return segmentContainer.setValues({
    [mode]: createValue(mode, [...values])
  });
};
