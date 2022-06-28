import { Segment, Type, Mode } from '@lib/enums';

import { Service } from './service.type';
import { getType } from './get-type';
import { getApi } from './get-api';

export const genIsSelectedTest = (service: Service, segment: Segment, mode: Mode) => {
  const items = getFn(service, segment, mode);
  if (!items.length) {
    throw `No funcs for ${segment}`;
  }

  describe('should return proper state', () => {
    items
      .forEach(([fn, expected, checkMode, checkSegment]) => {
        const result = fn();
        if (expected) {
          it(`${checkSegment} ${checkMode} should be selected`, () => expect(result).toBeTruthy());
        } else {
          it(`${checkSegment} ${checkMode} should not be selected`, () => expect(result).toBeFalsy());
        }
      });
  });
};

const getFn = (service: Service, segment: Segment, mode: Mode) => {
  const type = getType(segment);
  const api = getApi(service, type);
  const every = [() => api.isEverySelected(), mode === Mode.EVERY, Mode.EVERY, segment] as const;

  if (type !== Type.DAY) {
    return [
      every,
      [() => api.isIncrementSelected(), mode === Mode.INCREMENT, Mode.INCREMENT, segment],
      [() => api.isRangeSelected(), mode === Mode.RANGE, Mode.RANGE, segment],
      [() => api.isAndSelected(), mode === Mode.AND, Mode.AND, segment]
    ] as const;
  }

  const dayOfMonth = [
    [() => api.isDayOfMonthIncrementSelected(), segment === Segment.dayOfMonth && mode === Mode.INCREMENT, Mode.INCREMENT, Segment.dayOfMonth],
    [() => api.isDayOfMonthAndSelected(), segment === Segment.dayOfMonth && mode === Mode.AND, Mode.AND, Segment.dayOfMonth],
    [() => api.isDayOfMonthLastDaySelected(), mode === Mode.LAST_DAY, Mode.LAST_DAY, segment],
    [() => api.isDayOfMonthLastDayWeekSelected(), mode === Mode.LAST_DAY_WEEK, Mode.LAST_DAY_WEEK, segment],
    [() => api.isDayOfMonthDaysBeforeEndMonthSelected(), mode === Mode.DAYS_BEFORE_END_MONTH, Mode.DAYS_BEFORE_END_MONTH, segment],
    [() => api.isDayOfMonthNearestWeekDayOfMonthSelected(), mode === Mode.NEAREST_WEEKDAY_OF_MONTH, Mode.NEAREST_WEEKDAY_OF_MONTH, segment]
  ] as const;

  const dayOfWeek = [
    every,
    [() => api.isDayOfWeekIncrementSelected(), segment === Segment.dayOfWeek && mode === Mode.INCREMENT, Mode.INCREMENT, Segment.dayOfWeek],
    [() => api.isDayOfWeekAndSelected(), segment === Segment.dayOfWeek && mode === Mode.AND, Mode.AND, Segment.dayOfWeek],
    [() => api.isDayOfWeekRangeSelected(), mode === Mode.RANGE, Mode.RANGE, segment],
    [() => api.isDayOfWeekLastNTHDayWeekSelected(), mode === Mode.LAST_NTH_DAY_WEEK, Mode.LAST_NTH_DAY_WEEK, segment],
    [() => api.isDayOfWeekNTHWeekDayOfMonthSelected(), mode === Mode.NTH_WEEKDAY_OF_MONTH, Mode.NTH_WEEKDAY_OF_MONTH, segment]
  ] as const;

  const dayOfMonthSelected = dayOfMonth.some(info => !!info[1]);
  const dayOfWeekSelected = dayOfWeek.some(info => !!info[1]);

  if (segment === Segment.dayOfMonth && !dayOfMonthSelected) {
    return dayOfMonth;
  }
  if (segment === Segment.dayOfWeek && !dayOfWeekSelected) {
    return dayOfWeek;
  }

  return [
    ...dayOfMonth,
    ...dayOfWeek
  ] as const;
};
