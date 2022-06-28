import { Mode, Segment } from '@lib/enums';
import { TestCronUIBaseService, TestCronQuartzUIService } from './../../services';
import { getTestMaker } from './../method';

const createBaseDayTest = getTestMaker(TestCronUIBaseService, 'testGetDayApi');
const createQuartzDayTest = getTestMaker(TestCronQuartzUIService, 'testGetDayApi');

const isControlsDisabled = {
  isDayOfWeekRangeControlsDisabled: createQuartzDayTest('isDayOfWeekRangeControlsDisabled', Mode.RANGE, Segment.dayOfWeek, {}),
  isDayOfWeekLastNTHDayWeekControlsDisabled: createQuartzDayTest('isDayOfWeekLastNTHDayWeekControlsDisabled', Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek, {}),
  isDayOfMonthDaysBeforeEndMonthControlsDisabled: createQuartzDayTest('isDayOfMonthDaysBeforeEndMonthControlsDisabled', Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth, {}),
  isDayOfMonthNearestWeekDayOfMonthControlsDisabled: createQuartzDayTest('isDayOfMonthNearestWeekDayOfMonthControlsDisabled', Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth, {}),
  isDayOfWeekNTHWeekDayOfMonthControlsDisabled: createQuartzDayTest('isDayOfWeekNTHWeekDayOfMonthControlsDisabled', Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, {}),
  isDayOfWeekIncrementControlsDisabled: createBaseDayTest('isDayOfWeekIncrementControlsDisabled', Mode.INCREMENT, Segment.dayOfWeek, {}),
  isDayOfMonthIncrementControlsDisabled: createBaseDayTest('isDayOfMonthIncrementControlsDisabled', Mode.INCREMENT, Segment.dayOfMonth, {}),
  isDayOfWeekAndControlsDisabled: createBaseDayTest('isDayOfWeekAndControlsDisabled', Mode.AND, Segment.dayOfWeek, {}),
  isDayOfMonthAndControlsDisabled: createBaseDayTest('isDayOfMonthAndControlsDisabled', Mode.AND, Segment.dayOfMonth, {})
} as const;

export const testIsControlsDisabled = (methods: (keyof typeof isControlsDisabled)[]) => {
  return methods
    .map(method => isControlsDisabled[method])
    .forEach(fn => fn((method, selectMode, selectSegment, inst) => it('', () => {
      inst.testSetDisabled(false);

      inst.testSetSelectedMode(selectSegment, Mode.EVERY);
      expect(method()).toBeTruthy();

      inst.testSetSelectedMode(selectSegment, selectMode);
      expect(method()).toBeFalsy();

      inst.testSetDisabled(true);
      expect(method()).toBeTruthy();
    })));
};
