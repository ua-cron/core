import { Mode, Segment } from '@lib/enums';
import { TestCronUIBaseService, TestCronQuartzUIService } from './../../services';
import { getTestMaker } from './../method';

const createBaseDayTest = getTestMaker(TestCronUIBaseService, 'testGetDayApi');
const createQuartzDayTest = getTestMaker(TestCronQuartzUIService, 'testGetDayApi');

const getValue = {
  getDayOfWeekRangePrimary: createQuartzDayTest('getDayOfWeekRangePrimary', Mode.RANGE, Segment.dayOfWeek, 0),
  getDayOfWeekRangeSecondary: createQuartzDayTest('getDayOfWeekRangeSecondary', Mode.RANGE, Segment.dayOfWeek, 1),
  getDayOfWeekLastNTHDayWeekValue: createQuartzDayTest('getDayOfWeekLastNTHDayWeekValue', Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek, 0),
  getDayOfMonthDaysBeforeEndMonthValue: createQuartzDayTest('getDayOfMonthDaysBeforeEndMonthValue', Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth, 0),
  getDayOfMonthNearestWeekDayOfMonthValue: createQuartzDayTest('getDayOfMonthNearestWeekDayOfMonthValue', Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth, 0),
  getDayOfWeekNTHWeekDayOfMonthPrimaryValue: createQuartzDayTest('getDayOfWeekNTHWeekDayOfMonthPrimaryValue', Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, 1),
  getDayOfWeekNTHWeekDayOfMonthSecondaryValue: createQuartzDayTest('getDayOfWeekNTHWeekDayOfMonthSecondaryValue', Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, 0),
  getDayOfWeekIncrementPrimary: createBaseDayTest('getDayOfWeekIncrementPrimary', Mode.INCREMENT, Segment.dayOfWeek, 1),
  getDayOfWeekIncrementSecondary: createBaseDayTest('getDayOfWeekIncrementSecondary', Mode.INCREMENT, Segment.dayOfWeek, 0),
  getDayOfMonthIncrementPrimary: createBaseDayTest('getDayOfMonthIncrementPrimary', Mode.INCREMENT, Segment.dayOfMonth, 1),
  getDayOfMonthIncrementSecondary: createBaseDayTest('getDayOfMonthIncrementSecondary', Mode.INCREMENT, Segment.dayOfMonth, 0)
} as const;

export const testGetValue = (methods: (keyof typeof getValue)[]) => {
  return methods
    .map(method => getValue[method])
    .forEach(fn => fn((method, selectMode, selectSegment, inst, position) => {
      const value = Math.random().toString();
      it(`should return ${value} value`, () => {
        const values = ['_', '_'];
        values[position] = value;
        inst.testSetValues(selectSegment, selectMode, [...values]);
        expect(method()).toEqual(value);
      });
    }));
};
