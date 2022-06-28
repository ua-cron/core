import { AndValue, RangeValue, IncrementValue, EveryValue } from '@lib/values';
import { BaseValues } from '@lib/segment-values/base.abstract';
import { Mode, Segment } from '@lib/enums';
import { Values } from '@lib/types';
import { segments, allModes, valuesMode, commonModes, segmentsModesMap } from './../../payloads';

describe('Segment values: base values', () => {
  segments().forEach(segment => describe(segment, () => {
    describe('create without params', () => {
      const ints = getInstance(segment);

      allModes().forEach(mode => describe(mode, () => {
        const value = ints[mode];
        if (commonModes().includes(mode)) {
          it('should have default value', () => {
            expect(value).not.toBeUndefined();
            expect(value).toBeInstanceOf(valuesMode()[mode]);
          });
        } else {
          it('should be undefined', () => expect(value).toBeUndefined());
        }
      }));
    });

    describe('create with params', () => {
      const every = new EveryValue();
      const and = new AndValue({ values: ['10', '11'] });
      const range = new RangeValue({ values: ['2', '4'] });
      const increment = new IncrementValue({ values: ['0', '10'] });
      [
        { [Mode.EVERY]: every },
        { [Mode.AND]: and },
        { [Mode.RANGE]: range },
        { [Mode.INCREMENT]: increment },
        { [Mode.AND]: and, [Mode.RANGE]: range },
        { [Mode.RANGE]: range, [Mode.INCREMENT]: increment },
        { [Mode.INCREMENT]: increment, [Mode.AND]: and },
        { [Mode.AND]: and, [Mode.RANGE]: range, [Mode.INCREMENT]: increment },
        { [Mode.AND]: and, [Mode.EVERY]: every },
        { [Mode.RANGE]: range, [Mode.EVERY]: every },
        { [Mode.INCREMENT]: increment, [Mode.EVERY]: every },
        { [Mode.AND]: and, [Mode.RANGE]: range, [Mode.EVERY]: every },
        { [Mode.RANGE]: range, [Mode.INCREMENT]: increment, [Mode.EVERY]: every },
        { [Mode.INCREMENT]: increment, [Mode.AND]: and, [Mode.EVERY]: every },
        { [Mode.AND]: and, [Mode.RANGE]: range, [Mode.INCREMENT]: increment, [Mode.EVERY]: every }
      ].forEach(input => describe(Object.keys(input).join(', '), () => {
        const ints = getInstance(segment, input);

        allModes().forEach(mode => describe(mode, () => {
          if (commonModes().includes(mode)) {
            const defaultMode = mode as Mode.AND|Mode.RANGE|Mode.INCREMENT|Mode.EVERY;
            const value = ints[defaultMode];
            const expectedValue = input[defaultMode];

            it(expectedValue ? 'should take passed value' : 'should have default value', () => {
              expect(value).not.toBeUndefined();
              expect(value).toBeInstanceOf(valuesMode()[mode]);

              if (expectedValue) {
                expect(value.values).toEqual(expectedValue.values);
                expect(value.values).toHaveLength(expectedValue.values.length);
              }
            });
          } else {
            it('should be undefined', () => expect(ints[mode]).toBeUndefined());
          }
        }));
      }));
    });

    describe('get()', () => {
      const modes = segmentsModesMap()[segment];
      const input = modes.reduce((acc, mode) => ({
        ...acc,
        [mode]: new (valuesMode()[mode])({ values: [
          Math.random().toString(),
          Math.random().toString()
        ] })
      }), {} as { [p in Mode]: Values });
      const ints = getInstance(segment);

      // @ts-ignore
      Object.keys(input).forEach(mode => ints[mode] = input[mode])

      modes
        .map(mode => [mode, input[mode]] as const)
        .forEach(([mode, expectedValue]) => it(`mode: ${mode} should return proper value`, () => {
          const value = ints.get(mode) as Values;
          expect(value).not.toBeNull();
          expect(value).toBeInstanceOf(valuesMode()[mode]);
          expect(value === ints[mode]).toBeFalsy();
          expect(value.values).toEqual(expectedValue.values);
          expect(value.values).toHaveLength(expectedValue.values.length);
        }));

      allModes()
        .filter(mode => !modes.includes(mode))
        .forEach(mode => it(`mode: ${mode} should return null`, () => {
          expect(ints.get(mode)).toBeNull();
        }));
    });
  }));
});

function getInstance<T extends Segment>(segment: T, input?: { [p in Mode]?: Values }) {
  // @ts-ignore
  class Test extends BaseValues<T> {
    protected readonly segment = segment;
  }
  // @ts-ignore
  return new Test(input);
}
