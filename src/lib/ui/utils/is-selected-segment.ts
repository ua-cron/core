import { SegmentModes } from './../../types';
import { Segment } from './../../enums';
import { ViewData } from './../view-data.model';

export const isSelectedSegment = <T extends Segment>(view: ViewData, segment: T, mode: SegmentModes<T>) => view.get(segment).selected === mode;
