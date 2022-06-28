import { Mode, Segment } from '@lib/enums';
import { TestCronUIBaseService, TestCronQuartzUIService } from './../../services';
import { getTestMaker } from './../method';

const createBaseDayTest = getTestMaker(TestCronUIBaseService, 'testGetDayApi');
const createQuartzDayTest = getTestMaker(TestCronQuartzUIService, 'testGetDayApi');

const select = {
  selectEvery: createBaseDayTest('selectEvery', Mode.EVERY, Segment.dayOfWeek, Segment.dayOfMonth),
  selectDayOfWeekIncrement: createBaseDayTest('selectDayOfWeekIncrement', Mode.INCREMENT, Segment.dayOfWeek, Segment.dayOfMonth),
  selectDayOfMonthIncrement: createBaseDayTest('selectDayOfMonthIncrement', Mode.INCREMENT, Segment.dayOfMonth, Segment.dayOfWeek),
  selectDayOfWeekAnd: createBaseDayTest('selectDayOfWeekAnd', Mode.AND, Segment.dayOfWeek, Segment.dayOfMonth),
  selectDayOfMonthAnd: createBaseDayTest('selectDayOfMonthAnd', Mode.AND, Segment.dayOfMonth, Segment.dayOfWeek),
  selectDayOfWeekRange: createQuartzDayTest('selectDayOfWeekRange', Mode.RANGE, Segment.dayOfWeek, Segment.dayOfMonth),
  selectDayOfMonthLastDay: createQuartzDayTest('selectDayOfMonthLastDay', Mode.LAST_DAY, Segment.dayOfMonth, Segment.dayOfWeek),
  selectDayOfMonthLastDayWeek: createQuartzDayTest('selectDayOfMonthLastDayWeek', Mode.LAST_DAY_WEEK, Segment.dayOfMonth, Segment.dayOfWeek),
  selectDayOfWeekLastNTHDayWeek: createQuartzDayTest('selectDayOfWeekLastNTHDayWeek', Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek, Segment.dayOfMonth),
  selectDayOfMonthDaysBeforeEndMonth: createQuartzDayTest('selectDayOfMonthDaysBeforeEndMonth', Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth,  Segment.dayOfWeek),
  selectDayOfMonthNearestWeekDayOfMonth: createQuartzDayTest('selectDayOfMonthNearestWeekDayOfMonth', Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth, Segment.dayOfWeek),
  selectDayOfWeekNTHWeekDayOfMonth: createQuartzDayTest('selectDayOfWeekNTHWeekDayOfMonth', Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, Segment.dayOfMonth)
} as const;

export const testSelect = (methods: (keyof typeof select)[]) => {
  return methods
    .map(method => select[method])
    .forEach(fn => fn((method, selectMode, selectSegment, inst, resetSegment) => it('', () => {
      inst.testSetSelectedMode(selectSegment, Mode.NONE);
      inst.testSetSelectedMode(resetSegment, Mode.NONE);
      expect(inst.testGetSelected(selectSegment)).toEqual(Mode.NONE);
      expect(inst.testGetSelected(resetSegment)).toEqual(Mode.NONE);

      method();
      expect(inst.testGetSelected(selectSegment)).toEqual(selectMode);
      expect(inst.testGetSelected(resetSegment)).toEqual(Mode.NONE);
    })));
};
