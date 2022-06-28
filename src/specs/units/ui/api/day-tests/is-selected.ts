import { Mode, Segment } from '@lib/enums';
import { TestCronUIBaseService, TestCronQuartzUIService } from './../../services';
import { getTestMaker } from './../method';

const createBaseDayTest = getTestMaker(TestCronUIBaseService, 'testGetDayApi');
const createQuartzDayTest = getTestMaker(TestCronQuartzUIService, 'testGetDayApi');

const isSelected = {
  isEverySelected: createBaseDayTest('isEverySelected', Mode.EVERY, Segment.dayOfWeek, {}),
  isDayOfWeekIncrementSelected: createBaseDayTest('isDayOfWeekIncrementSelected', Mode.INCREMENT, Segment.dayOfWeek, {}),
  isDayOfMonthIncrementSelected: createBaseDayTest('isDayOfMonthIncrementSelected', Mode.INCREMENT, Segment.dayOfMonth, {}),
  isDayOfWeekAndSelected: createBaseDayTest('isDayOfWeekAndSelected', Mode.AND, Segment.dayOfWeek, {}),
  isDayOfMonthAndSelected: createBaseDayTest('isDayOfMonthAndSelected', Mode.AND, Segment.dayOfMonth, {}),
  isDayOfWeekRangeSelected: createQuartzDayTest('isDayOfWeekRangeSelected', Mode.RANGE, Segment.dayOfWeek, {}),
  isDayOfMonthLastDaySelected: createQuartzDayTest('isDayOfMonthLastDaySelected', Mode.LAST_DAY, Segment.dayOfMonth, {}),
  isDayOfMonthLastDayWeekSelected: createQuartzDayTest('isDayOfMonthLastDayWeekSelected', Mode.LAST_DAY_WEEK, Segment.dayOfMonth, {}),
  isDayOfWeekLastNTHDayWeekSelected: createQuartzDayTest('isDayOfWeekLastNTHDayWeekSelected', Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek, {}),
  isDayOfMonthDaysBeforeEndMonthSelected: createQuartzDayTest('isDayOfMonthDaysBeforeEndMonthSelected', Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth, {}),
  isDayOfMonthNearestWeekDayOfMonthSelected: createQuartzDayTest('isDayOfMonthNearestWeekDayOfMonthSelected', Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth, {}),
  isDayOfWeekNTHWeekDayOfMonthSelected: createQuartzDayTest('isDayOfWeekNTHWeekDayOfMonthSelected', Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, {})
} as const;

export const testIsSelected = (methods: (keyof typeof isSelected)[]) => {
  return methods
    .map(method => isSelected[method])
    .forEach(fn => fn((method, selectMode, selectSegment, inst) => it('', () => {
      inst.testSetSelectedMode(selectSegment, Mode.NONE);
      expect(method()).toBeFalsy();

      inst.testSetSelectedMode(selectSegment, selectMode);
      expect(method()).toBeTruthy();
    })));
};
