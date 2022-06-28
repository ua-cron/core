import { Mode, Segment } from '@lib/enums';
import { TestCronUIBaseService } from './../../services';
import { getTestMaker } from './../method';

const createBaseDayTest = getTestMaker(TestCronUIBaseService, 'testGetDayApi');

const isSelectedAndValue = {
  isSelectedDayOfMonthAndValue: createBaseDayTest('isSelectedDayOfMonthAndValue', Mode.AND, Segment.dayOfMonth, {}),
  isSelectedDayOfWeekAndValue: createBaseDayTest('isSelectedDayOfWeekAndValue', Mode.AND, Segment.dayOfWeek, {}),
} as const;

export const testIsSelectedAndValue = (methods: (keyof typeof isSelectedAndValue)[]) => {
  return methods
    .map(method => isSelectedAndValue[method])
    .forEach(fn => fn((method, selectMode, selectSegment, inst) => {
      const values = ['10', '11', '12', '13'];
      inst.testSetValues(selectSegment, selectMode, [...values]);

      expect(method('1')).toBeFalsy()
      values.forEach(value => expect(method(value)).toBeTruthy());
    }));
};
