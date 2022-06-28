import { Segment, Mode } from './../../enums';
import { ViewData } from './../view-data.model';
import { getSegmentValues } from './get-segment-value';

export const hasAndValue = (view: ViewData, value: string, segment: Segment) => {
  const values = getSegmentValues(view, segment, Mode.AND);
  return !!~values.indexOf(value);
};
