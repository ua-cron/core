import { BaseValue } from '@lib/values';
import { Mode } from '@lib/enums';

describe('Values: base value', () => {
  it('create without params', () => {
    const ints = getInstance();

    expect(ints.values).toEqual([]);
    expect(ints.values).toHaveLength(0);
  });

  it('create with params', () => {
    const values = ['1', '2'];
    const ints = getInstance({ values });
    expect(ints.values).toEqual(values);
    expect(ints.values === values).toBeFalsy();
    expect(ints.values).toHaveLength(values.length);
  });

  it('values should be readonly', () => {
    const ints = getInstance();

    // @ts-ignore
    expect(() => ints.values.push('2')).toThrow();
    // @ts-ignore
    expect(() => ints.values[0] = '5').toThrow();
  });

  it('get should return proper values', () => {
    const ints0 = getInstance();
    expect(ints0.get()).toEqual([]);
    expect(ints0.get()).toHaveLength(0);

    const values1 = ['1', '2'];
    const ints1 = getInstance({ values: values1 });
    expect(ints1.get()).toEqual(values1);
    expect(ints1.get() === values1).toBeFalsy();
    expect(ints1.get()).toHaveLength(values1.length);
  });
});

function getInstance(input?: { values: readonly string[] } ) {
  class Test extends BaseValue {
    getMode() {
      return Mode.AND;
    }
    clone() {
      return new Test();
    }
  }
  return new Test(input);
}
