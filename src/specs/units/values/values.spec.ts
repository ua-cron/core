import { ConstantValue } from '@lib/enums';
import { valuesMode, allModes, valuesConstant } from './../../payloads';

describe('Values', () => {
  allModes().forEach(mode => describe(mode, () => {
    const valueClass = valuesMode()[mode];
    // @ts-ignore
    const constantValue = valuesConstant()[mode];
    const defaultValues = [constantValue || ConstantValue.EVERY];
    const testValues0 = ['1'];
    const testValues1 = ['2', '3'];
    const expectedTestValues0 = constantValue ? [constantValue] : testValues0;
    const expectedTestValues1 = constantValue ? [constantValue] : testValues1;

    it('create without params', () => {
      const value = new valueClass();
      expect(value.values).toEqual(defaultValues);
      expect(value.values).toHaveLength(defaultValues.length);
    });

    it('create with params', () => {
      const value = new valueClass({ values: testValues0 });
      expect(value.values).toEqual(expectedTestValues0);
      expect(value.values).toHaveLength(expectedTestValues0.length);
      expect(value.values === testValues0).toBeFalsy();
    });

    it('should return proper mode', () => {
      expect(new valueClass().getMode()).toBe(mode);
    });

    it('clone itself without params', () => {
      const inst = new valueClass();
      const clone = inst.clone();
      expect(clone === inst).toBeFalsy();
      expect(clone.values).toEqual(inst.values);
      expect(clone.values === inst.values).toBeFalsy();
      expect(clone).toBeInstanceOf(valueClass);
    });

    it('clone itself with params', () => {
      const inst = new valueClass({ values: testValues0 });
      const clone = inst.clone(testValues1);

      if (!constantValue) {
        expect(clone.values).not.toEqual(inst.values);
      }

      expect(clone === inst).toBeFalsy();
      expect(clone.values).toEqual(expectedTestValues1);
      expect(clone.values).toHaveLength(expectedTestValues1.length);
      expect(clone.values === inst.values).toBeFalsy();
      expect(clone.values === expectedTestValues1).toBeFalsy();
      expect(clone).toBeInstanceOf(valueClass);
    });
  }));
});
