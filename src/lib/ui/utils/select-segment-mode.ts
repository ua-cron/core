import { SegmentModes, SegmentContainers } from './../../types';
import { Segment } from './../../enums';
import { ViewData } from './../view-data.model';

export function selectSegmentMode<T extends Segment>(view: ViewData, segment: T, mode: SegmentModes<T>): SegmentContainers<T>;
export function selectSegmentMode<T extends Segment>(view: ViewData, segment: T, mode: SegmentModes<T>) {
  return view.get(segment).select(mode);
}
