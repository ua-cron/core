import { Mode, Segment } from '@lib/enums';
import { TestCronUIBaseService, TestCronQuartzUIService } from './../../services';
import { getTestMaker } from './../method';

const createBaseDayTest = getTestMaker(TestCronUIBaseService, 'testGetDayApi');
const createQuartzDayTest = getTestMaker(TestCronQuartzUIService, 'testGetDayApi');

const setValue = {
  setDayOfWeekRangePrimary: createQuartzDayTest('setDayOfWeekRangePrimary', Mode.RANGE, Segment.dayOfWeek, 0),
  setDayOfWeekRangeSecondary: createQuartzDayTest('setDayOfWeekRangeSecondary', Mode.RANGE, Segment.dayOfWeek, 1),
  setDayOfWeekLastNTHDayWeekValue: createQuartzDayTest('setDayOfWeekLastNTHDayWeekValue', Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek, 0),
  setDayOfMonthDaysBeforeEndMonthValue: createQuartzDayTest('setDayOfMonthDaysBeforeEndMonthValue', Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth, 0),
  setDayOfMonthNearestWeekDayOfMonthValue: createQuartzDayTest('setDayOfMonthNearestWeekDayOfMonthValue', Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth, 0),
  setDayOfWeekNTHWeekDayOfMonthPrimaryValue: createQuartzDayTest('setDayOfWeekNTHWeekDayOfMonthPrimaryValue', Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, 1),
  setDayOfWeekNTHWeekDayOfMonthSecondaryValue: createQuartzDayTest('setDayOfWeekNTHWeekDayOfMonthSecondaryValue', Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, 0),
  setDayOfWeekIncrementPrimary: createBaseDayTest('setDayOfWeekIncrementPrimary', Mode.INCREMENT, Segment.dayOfWeek, 1),
  setDayOfWeekIncrementSecondary: createBaseDayTest('setDayOfWeekIncrementSecondary', Mode.INCREMENT, Segment.dayOfWeek, 0),
  setDayOfMonthIncrementPrimary: createBaseDayTest('setDayOfMonthIncrementPrimary', Mode.INCREMENT, Segment.dayOfMonth, 1),
  setDayOfMonthIncrementSecondary: createBaseDayTest('setDayOfMonthIncrementSecondary', Mode.INCREMENT, Segment.dayOfMonth, 0)
} as const;

export const testSetValue = (methods: (keyof typeof setValue)[]) => {
  return methods
    .map(method => setValue[method])
    .forEach(fn => fn((method, selectMode, selectSegment, inst, position) => {
      const value = Math.random().toString();

      it(`should set ${value} value`, () => {
        method(value);
        const result = inst.testGetValues(selectSegment, selectMode)[position];
        expect(result).toEqual(value);
      });
    }));
};
