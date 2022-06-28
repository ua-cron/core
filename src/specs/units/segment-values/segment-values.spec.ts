import { Mode, Segment } from '@lib/enums';
import { Values } from '@lib/types';
import { segmentValues, allModes, segments, segmentsModesMap, valuesMode } from './../../payloads';

describe('Segment values', () => {
  segments().forEach(segment => describe(segment, () => {
    const instClass = segmentValues()[segment];
    const modes = segmentsModesMap()[segment];
    const input = genInput(segment);

    // @ts-ignore
    const inst = new instClass(input);
    modes.forEach(mode => describe(mode, () => {
      const expected = input[mode];

      it('should handle values passed', () => {
        const value = inst[mode] as Values;

        expect(value === expected).toBeFalsy();
        expect(value).toBeInstanceOf(valuesMode()[mode]);
        expect(value.values).toEqual(expected.values);
        expect(value.values).toHaveLength(expected.values.length);
      });

      it('get() should return proper value', () => {
        const value = inst.get(mode) as Values;
        const directValue = inst[mode] as Values;
        expect(value === directValue).toBeFalsy();
        expect(value).toBeInstanceOf(valuesMode()[mode]);
        expect(value.values).toEqual(directValue.values);
        expect(value.values).toHaveLength(directValue.values.length);
      });
    }));

    allModes()
      .filter(mode => !modes.includes(mode))
      .forEach(mode => {
        it(`get() should return null of mode: ${mode}`, () => {
          expect(inst.get(mode)).toBeNull();
        });

        it(`mode: ${mode} should not have value`, () => {
          expect(inst[mode]).toBeUndefined();
        });
      });

    describe('clone() without params', () => {
      const copy = inst.clone();

      it('copy should have proper instance', () => {
        expect(copy === inst).toBeFalsy();
        expect(copy).toBeInstanceOf(segmentValues()[segment]);
      });

      modes.forEach(mode => it(mode, () => {
        const instValue = inst[mode] as Values;
        const copyValue = copy[mode] as Values;

        expect(copyValue === instValue).toBeFalsy();
        expect(copyValue).toEqual(instValue);
        expect(copyValue.getMode()).toEqual(instValue.getMode());
        expect(copyValue.values).toEqual(instValue.values);
        expect(copyValue.values).toHaveLength(instValue.values.length);
        expect(copyValue).toBeInstanceOf(valuesMode()[mode]);
      }));
    });

    describe('clone() with params', () => {
      const cloneInput = genInput(segment);
      // @ts-ignore
      const copy = inst.clone(cloneInput);

      modes.forEach(mode => it(mode, () => {
        const inputValue = cloneInput[mode] as Values;
        const copyValue = copy[mode] as Values;

        expect(copyValue === inputValue).toBeFalsy();
        expect(copyValue).toEqual(inputValue);
        expect(copyValue.getMode()).toEqual(inputValue.getMode());
        expect(copyValue.values).toEqual(inputValue.values);
        expect(copyValue.values).toHaveLength(inputValue.values.length);
        expect(copyValue).toBeInstanceOf(valuesMode()[mode]);
      }));
    });

    describe('clone() with partial params', () => {
      const and = genInput(segment)[Mode.AND];
      const copy = inst.clone({
        // @ts-ignore
        [Mode.AND]: and
      });

      modes
        .filter(mode => mode !== Mode.AND)
        .forEach(mode => it(mode, () => {
          const instValue = inst[mode] as Values;
          const copyValue = copy[mode] as Values;

          expect(copyValue === instValue).toBeFalsy();
          expect(copyValue).toEqual(instValue);
          expect(copyValue.getMode()).toEqual(instValue.getMode());
          expect(copyValue.values).toEqual(instValue.values);
          expect(copyValue.values).toHaveLength(instValue.values.length);
          expect(copyValue).toBeInstanceOf(valuesMode()[mode]);
        }));

      it(Mode.AND, () => {
        const copyValue = copy[Mode.AND];

        expect(copyValue === and).toBeFalsy();
        expect(copyValue).toEqual(and);
        expect(copyValue.getMode()).toEqual(and.getMode());
        expect(copyValue.values).toEqual(and.values);
        expect(copyValue.values).toHaveLength(and.values.length);
        expect(copyValue).toBeInstanceOf(valuesMode()[Mode.AND]);
      });
    });
  }));
});

function genInput(segment: Segment) {
  const modes = segmentsModesMap()[segment];
  return modes.reduce((acc, mode) => ({
    ...acc,
    [mode]: new (valuesMode()[mode])({ values: [
      Math.random().toString(),
      Math.random().toString()
    ] })
  }), {} as { [p in Mode]: Values });
}
