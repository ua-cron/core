import { Mode } from '@lib/enums';
import { createValue } from '@lib/utils';
import { allModes, valuesMode, valuesConstant, valuesConstantModes } from './../../payloads';

describe('Utils: create value', () => {
  it(`should throw error if mode isn't supported`, () => {
    const notSupportedMode = '' as Mode;
    expect(() => createValue(notSupportedMode, [])).toThrow();
  });

  allModes().forEach(mode => it(`mode: ${mode}, should be instance of proper value`, () => {
    const value = createValue(mode, []);
    expect(value).toBeInstanceOf(valuesMode()[mode]);
  }));

  valuesConstantModes().forEach(mode => it(`mode: ${mode}, should have stable constant values`, () => {
    const value = createValue(mode, ['0', '2', '3']);
    expect(value.values).toEqual([valuesConstant()[mode]]);
    expect(value.values).toHaveLength(1);
  }));

  allModes()
    // @ts-ignore
    .filter(mode => !valuesConstantModes().includes(mode))
    .forEach(mode => it(`mode: ${mode}, should get passed values`, () => {
      const values = [Math.random().toString(), Math.random().toString()];
      const value = createValue(mode, values);
      expect(value.values).toEqual(values);
      expect(value.values).toHaveLength(values.length);
    }));
});
