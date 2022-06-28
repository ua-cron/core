import { Segment } from './enums';
import { EveryValue } from './values';
import { SegmentValue } from './types';

export class DataModel {
  readonly [Segment.seconds]: SegmentValue<Segment.seconds>;
  readonly [Segment.minutes]: SegmentValue<Segment.minutes>;
  readonly [Segment.hours]: SegmentValue<Segment.hours>;
  readonly [Segment.dayOfMonth]: SegmentValue<Segment.dayOfMonth>;
  readonly [Segment.month]: SegmentValue<Segment.month>;
  readonly [Segment.dayOfWeek]: SegmentValue<Segment.dayOfWeek>;
  readonly [Segment.year]: SegmentValue<Segment.year>;

  constructor(d: Partial<DataModel>) {
    this.seconds = d.seconds ? d.seconds.clone() : new EveryValue();
    this.minutes = d.minutes ? d.minutes.clone() : new EveryValue();
    this.hours = d.hours ? d.hours.clone() : new EveryValue();
    this.dayOfMonth = d.dayOfMonth ? d.dayOfMonth.clone() : new EveryValue();
    this.month = d.month ? d.month.clone() : new EveryValue();
    this.dayOfWeek = d.dayOfWeek ? d.dayOfWeek.clone() : new EveryValue();
    this.year = d.year ? d.year.clone() : new EveryValue();
  }
}
