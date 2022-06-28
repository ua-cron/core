import { CronType } from './../enums';
import { DataModel } from './../data.model';
import { stringifySegment } from './stringify-segment';

export const stringifyDataModel = (model: DataModel, cronType: CronType) => {
  const values = [
    ...(cronType === CronType.QUARTZ ? [stringifySegment(model.seconds, cronType)] : []),
    stringifySegment(model.minutes, cronType),
    stringifySegment(model.hours, cronType),
    stringifySegment(model.dayOfMonth, cronType),
    stringifySegment(model.month, cronType),
    stringifySegment(model.dayOfWeek, cronType),
    ...(cronType === CronType.QUARTZ ? [stringifySegment(model.year, cronType)] : [])
  ];
  return values.join(' ');
}
