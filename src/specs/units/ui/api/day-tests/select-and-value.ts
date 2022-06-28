import { Mode, Segment } from '@lib/enums';
import { TestCronUIBaseService } from './../../services';
import { getTestMaker } from './../method';

const createBaseDayTest = getTestMaker(TestCronUIBaseService, 'testGetDayApi');

const selectAndValue = {
  selectDayOfWeekAndValue: createBaseDayTest('selectDayOfWeekAndValue', Mode.AND, Segment.dayOfWeek, {}),
  selectDayOfMonthAndValue: createBaseDayTest('selectDayOfMonthAndValue', Mode.AND, Segment.dayOfMonth, {})
} as const;

export const testSelectAndValue = (methods: (keyof typeof selectAndValue)[]) => {
  return methods
    .map(method => selectAndValue[method])
    .forEach(fn => fn((method, selectMode, selectSegment, inst) => {
      it('should not remove last item', () => {
        const values = ['10'];
        inst.testSetValues(selectSegment, selectMode, [...values]);
        expect(method(values[0])).toBeFalsy()
        expect(inst.testGetValues(selectSegment, selectMode)).toEqual(values);
        expect(inst.testGetValues(selectSegment, selectMode)).toHaveLength(values.length);
      });

      it('should add value if is not present in the list', () => {
        const values = ['10', '11', '12', '13'];
        inst.testSetValues(selectSegment, selectMode, []);

        values.forEach(value => {
          expect(inst.testGetValues(selectSegment, selectMode)).not.toContain(value);
          expect(method(value)).toBeTruthy();
          expect(inst.testGetValues(selectSegment, selectMode)).toContain(value);
        });
        expect(inst.testGetValues(selectSegment, selectMode)).toEqual(values);
        expect(inst.testGetValues(selectSegment, selectMode)).toHaveLength(values.length);
      });

      it('should remove value if is present in the list', () => {
        const lastValue = '13'
        const values = ['10', '11', '12', lastValue];
        inst.testSetValues(selectSegment, selectMode, [...values]);

        values.forEach((value, i) => {
          expect(inst.testGetValues(selectSegment, selectMode)).toContain(value);

          if (values.length > i + 1) {
            expect(method(value)).toBeTruthy();
            expect(inst.testGetValues(selectSegment, selectMode)).not.toContain(value);
          } else {
            expect(method(value)).toBeFalsy();
            expect(inst.testGetValues(selectSegment, selectMode)).toContain(value);
          }
        });
        expect(inst.testGetValues(selectSegment, selectMode)).toEqual([lastValue]);
        expect(inst.testGetValues(selectSegment, selectMode)).toHaveLength(1);
      });
    }));
};
