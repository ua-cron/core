import { Mode } from '@lib/enums';
import { getCommonTestMaker } from './method';

const createTests = getCommonTestMaker();

describe('UI: base service: common api', () => {
  [
    ...createTests('isEverySelected', Mode.EVERY, {}),
    ...createTests('isIncrementSelected', Mode.INCREMENT, {}),
    ...createTests('isAndSelected', Mode.AND, {}),
    ...createTests('isRangeSelected', Mode.RANGE, {})
  ].forEach(fn => fn((method, selectMode, segment, inst, { modes }) => modes.forEach(mode => it(mode, () => {
    inst.testSetSelectedMode(segment, mode);
    const result = method();

    if (mode === selectMode) {
      expect(result).toBeTruthy();
    } else {
      expect(result).toBeFalsy();
    }
  }))));

  [
    ...createTests('selectEvery', Mode.EVERY, {}),
    ...createTests('selectIncrement', Mode.INCREMENT, {}),
    ...createTests('selectAnd', Mode.AND, {}),
    ...createTests('selectRange', Mode.RANGE, {})
  ].forEach(fn => fn((method, selectMode, segment, inst, { modes }) => modes.forEach(mode => it(mode, () => {
    inst.testSetSelectedMode(segment, mode);

    if (mode !== selectMode) {
      expect(inst.testGetSelected(segment)).not.toEqual(selectMode);
    }

    method();
    expect(inst.testGetSelected(segment)).toEqual(selectMode);
  }))));

  [
    ...createTests('isIncrementControlsDisabled', Mode.INCREMENT, {}),
    ...createTests('isAndControlsDisabled', Mode.AND, {}),
    ...createTests('isRangeControlsDisabled', Mode.RANGE, {})
  ].forEach(fn => fn((method, selectMode, segment, inst, { modes }) => modes.forEach(mode => it(mode, () => {
    inst.testSetDisabled(false);
    inst.testSetSelectedMode(segment, mode);

    if (mode === selectMode) {
      expect(method()).toBeFalsy();
    } else {
      expect(method()).toBeTruthy();
    }

    inst.testSetDisabled(true);
    expect(method()).toBeTruthy();
  }))));

  [
    ...createTests('getIncrementPrimaryValue', Mode.INCREMENT, 1),
    ...createTests('getRangePrimaryValue', Mode.RANGE, 0),
    ...createTests('getRangeSecondaryValue', Mode.RANGE, 1)
  ].forEach(fn => fn((method, selectMode, segment, inst, { option }) => {
    const value = Math.random().toString();

    it(`should return ${value} value`, () => {
      const values = ['_', '_'];
      values[option] = value;
      inst.testSetValues(segment, selectMode, [...values]);
      expect(method()).toEqual(value);
    });
  }));

  [
    ...createTests('setIncrementPrimaryValue', Mode.INCREMENT, 1),
    ...createTests('setRangePrimaryValue', Mode.RANGE, 0),
    ...createTests('setRangeSecondaryValue', Mode.RANGE, 1)
  ].forEach(fn => fn((method, selectMode, segment, inst, { option }) => {
    const value = Math.random().toString();

    it(`should set ${value} value`, () => {
      method(value);
      const result = inst.testGetValues(segment, selectMode)[option];
      expect(result).toEqual(value);
    });
  }));

  createTests('isSelectedAndValue', Mode.AND, {}).forEach(fn => fn((method, selectMode, segment, inst) => it('should process', () => {
    const values = ['10', '11', '12', '13'];
    inst.testSetValues(segment, selectMode, [...values]);

    expect(method('1')).toBeFalsy()
    values.forEach(value => expect(method(value)).toBeTruthy());
  })));

  createTests('selectAndValue', Mode.AND, {}).forEach(fn => fn((method, selectMode, segment, inst) => {
    it('should not remove last item', () => {
      const values = ['10'];
      inst.testSetValues(segment, selectMode, [...values]);
      expect(method(values[0])).toBeFalsy()
      expect(inst.testGetValues(segment, selectMode)).toEqual(values);
      expect(inst.testGetValues(segment, selectMode)).toHaveLength(values.length);
    });

    it('should add value if is not present in the list', () => {
      const values = ['10', '11', '12', '13'];
      inst.testSetValues(segment, selectMode, []);

      values.forEach(value => {
        expect(inst.testGetValues(segment, selectMode)).not.toContain(value);
        expect(method(value)).toBeTruthy();
        expect(inst.testGetValues(segment, selectMode)).toContain(value);
      });
      expect(inst.testGetValues(segment, selectMode)).toEqual(values);
      expect(inst.testGetValues(segment, selectMode)).toHaveLength(values.length);
    });

    it('should remove value if is present in the list', () => {
      const lastValue = '13'
      const values = ['10', '11', '12', lastValue];
      inst.testSetValues(segment, selectMode, [...values]);

      values.forEach((value, i) => {
        expect(inst.testGetValues(segment, selectMode)).toContain(value);

        if (values.length > i + 1) {
          expect(method(value)).toBeTruthy();
          expect(inst.testGetValues(segment, selectMode)).not.toContain(value);
        } else {
          expect(method(value)).toBeFalsy();
          expect(inst.testGetValues(segment, selectMode)).toContain(value);
        }
      });
      expect(inst.testGetValues(segment, selectMode)).toEqual([lastValue]);
      expect(inst.testGetValues(segment, selectMode)).toHaveLength(1);
    });
  }));
});
