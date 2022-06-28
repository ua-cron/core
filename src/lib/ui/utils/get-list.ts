import { Segment } from './../../enums';
import { getMonthEveryList, getMonthList, getWeekDayList } from './../../utils';
import { genList } from './gen-list';
import { createOptions } from './create-options';

const defaultYearFrom = 2019;
const defaultYearTo = 2098;

export const getList = (segment: Segment, every = false, yearFrom?: number, yearTo?: number) => {
  if (segment === Segment.seconds) {
    return every ? genList(1, 60) : genList(0, 59);
  }
  if (segment === Segment.minutes) {
    return every ? genList(1, 60) : genList(0, 59);
  }
  if (segment === Segment.hours) {
    return every ? genList(1, 24) : genList(0, 23);
  }
  if (segment === Segment.dayOfMonth) {
    return every ? createOptions(getMonthEveryList()) : genList(1, 31);
  }
  if (segment === Segment.month) {
    return every ? genList(1, 12) : createOptions(getMonthList());
  }
  if (segment === Segment.dayOfWeek) {
    return every ? genList(1, 7) : createOptions(getWeekDayList());
  }
  if (segment === Segment.year) {
    if (every) {
      return genList(1, 93);
    }
    if (!yearFrom && !yearTo) {
      return genList(defaultYearFrom, defaultYearTo);
    }
    return genList(yearFrom || defaultYearFrom, yearTo || defaultYearTo);
  }
  return [];
}
