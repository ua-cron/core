import { getList, getDaysOfWeekCodes, getMonthCodes } from '@lib/ui/utils';
import { Segment, Type, Mode } from '@lib/enums';

import { Service } from './service.type';
import { getType } from './get-type';
import { getApi } from './get-api';

export const genValuesTest = (service: Service, mode: Mode, segment: Segment, values: string[]) => {
  const type = getType(segment);
  const api = getApi(service, type);
  const [primary, secondary] = values;

  if (mode === Mode.AND) {
    return getAndFn(service, segment, values)();
  }
  if (mode === Mode.INCREMENT) {
    return getIncrementFn(service, segment, values)();
  }
  if (mode === Mode.RANGE) {
    const fn = getRangeFn(service, segment, values);
    return fn ? fn() : undefined;
  }
  if (mode === Mode.LAST_NTH_DAY_WEEK) {
    return it('values should be same', () => expect(api.getDayOfWeekLastNTHDayWeekValue()).toEqual(primary));
  }
  if (mode === Mode.DAYS_BEFORE_END_MONTH) {
    return it('values should be same', () => expect(api.getDayOfMonthDaysBeforeEndMonthValue()).toEqual(primary));
  }
  if (mode === Mode.NEAREST_WEEKDAY_OF_MONTH) {
    return it('values should be same', () => expect(api.getDayOfMonthNearestWeekDayOfMonthValue()).toEqual(primary));
  }
  if (mode === Mode.NTH_WEEKDAY_OF_MONTH) {
    return it('values should be same', () => {
      expect(api.getDayOfWeekNTHWeekDayOfMonthPrimaryValue()).toEqual(primary);
      expect(api.getDayOfWeekNTHWeekDayOfMonthSecondaryValue()).toEqual(secondary);
    });
  }
};

const getRangeFn = (service: Service, segment: Segment, values: string[]) => {
  if (segment === Segment.dayOfMonth) {
    return;
  }

  const type = getType(segment);
  const api = getApi(service, type);
  const [primary, secondary] = values;

  const wrap = (fn: () => void) => {
    it('values list should have only two values', () => {
      expect(values).toHaveLength(2);
    });
    it('values should be same', () => fn());
  };

  if (type !== Type.DAY) {
    return () => wrap(() => {
      expect(api.getRangePrimaryValue()).toEqual(primary);
      expect(api.getRangeSecondaryValue()).toEqual(secondary);
    });
  }

  return () => wrap(() => {
    try {
      expect(api.getDayOfWeekRangePrimary()).toEqual(primary);
      expect(api.getDayOfWeekRangeSecondary()).toEqual(secondary);

    } catch (e) {
      throw values;
    }
  });
};

const getIncrementFn = (service: Service, segment: Segment, values: string[]) => {
  const type = getType(segment);
  const api = getApi(service, type);
  const [secondary, primary] = values;

  const wrap = (fn: () => void) => {
    it('values list should have only two values', () => {
      expect(values).toHaveLength(2);
    });
    it(`values should be same, ${secondary},${primary}`, () => fn());
  };

  if (type !== Type.DAY) {
    return () => wrap(() => {
      expect(api.getIncrementPrimaryValue()).toEqual(primary);
      expect(api.getIncrementSecondaryValue()).toEqual(secondary);
    });
  }

  if (segment === Segment.dayOfWeek) {
    return () => wrap(() => {
      expect(api.getDayOfWeekIncrementPrimary()).toEqual(primary);
      expect(api.getDayOfWeekIncrementSecondary()).toEqual(secondary);
    });
  } else if (segment === Segment.dayOfMonth) {
    return () => wrap(() => {
      expect(api.getDayOfMonthIncrementPrimary()).toEqual(primary);
      expect(api.getDayOfMonthIncrementSecondary()).toEqual(secondary);
    });
  }

  throw `${Mode.RANGE} is not assigned to ${segment}`;
};

const getAndFn = (service: Service, segment: Segment, values: string[]) => {
  const type = getType(segment);
  const api = getApi(service, type);

  if (type !== Type.DAY && segment !== Segment.month) {
    return () => {
      values.forEach(v => it(`value ${v} should be precent`, () => {
        expect(api.isSelectedAndValue(v)).toBeTruthy();
      }));

      getList(segment, false)
        .map(({ value }) => value)
        .filter(v => !values.includes(v))
        .forEach(v => it(`value ${v} should not be precent`, () => {
          expect(api.isSelectedAndValue(v)).toBeFalsy();
        }));
    };
  }

  if (segment === Segment.dayOfWeek) {
    return () => {
      values.forEach(v => it(`value ${v} should be precent`, () => {
        expect(api.isSelectedDayOfWeekAndValue(v)).toBeTruthy();
      }));

      getDaysOfWeekCodes()
        .map(({ value }) => value)
        .filter(v => !values.includes(v))
        .forEach(v => it(`value ${v} should not be precent`, () => {
          expect(api.isSelectedDayOfWeekAndValue(v)).toBeFalsy();
        }));
    };
  } else if (segment === Segment.dayOfMonth) {
    return () => {
      values.forEach(v => it(`value ${v} should be precent`, () => {
        expect(api.isSelectedDayOfMonthAndValue(v)).toBeTruthy();
      }));

      getList(segment, false)
        .map(({ value }) => value)
        .filter(v => !values.includes(v))
        .forEach(v => it(`value ${v} should not be precent`, () => {
          expect(api.isSelectedDayOfMonthAndValue(v)).toBeFalsy();
        }));
    };
  } else if (segment === Segment.month) {
    return () => {
      values.forEach(v => it(`value ${v} should be precent`, () => {
        expect(api.isSelectedAndValue(v)).toBeTruthy();
      }));

      getMonthCodes()
        .map(({ value }) => value)
        .filter(v => !values.includes(v))
        .forEach(v => it(`value ${v} should not be precent`, () => {
          expect(api.isSelectedAndValue(v)).toBeFalsy();
        }));
    };
  }

  throw `${Mode.AND} is not assigned to ${segment}`;
};
