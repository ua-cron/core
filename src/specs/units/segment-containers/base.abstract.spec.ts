import { BaseContainer } from '@lib/segment-containers/base.abstract';
import { Values, SegmentModes, SegmentValues } from '@lib/types';
import { Mode, Segment } from '@lib/enums';
import { segments, valuesMode, allModes, segmentValues, segmentsModesMap } from './../../payloads';

describe('Segment containers: base container', () => {
  segments().forEach(segment => describe(segment, () => {
    const valuesClass = segmentValues()[segment];
    const values = new valuesClass();
    const selected = Mode.AND;
    const modes = segmentsModesMap()[segment];

    describe('getSelected()', () => {
      modes.forEach(mode => it(`should return instance of: ${mode}`, () => {
        const inst = getInstance(segment, { selected: mode, values });
        const instValue = inst.getSelected() as Values;
        const valuesValue = values[mode] as Values;
        expect(instValue).toEqual(valuesValue);
        expect(instValue.values).toEqual(valuesValue.values);
        expect(instValue).toBeInstanceOf(valuesMode()[mode]);
        expect(instValue === valuesValue).toBeFalsy();
      }));
    });

    describe('select()', () => {
      const inst = getInstance(segment, { selected, values });
      modes.forEach(mode => it(`should return instance of: ${mode}`, () => {
        const copy = inst.select(mode);
        if (inst.selected !== mode) {
          expect(copy).not.toEqual(inst);
          expect(copy.selected).not.toEqual(inst.selected);
        }
        expect(copy.getSelected()).toEqual(inst.values[mode]);
        expect(copy.selected).toEqual(mode);
        expect(copy.values).toEqual(inst.values);
        expect(copy === inst).toBeFalsy();
        expect(copy.values === inst.values).toBeFalsy();
        expect(copy).toBeInstanceOf(inst.constructor);
      }));

      allModes()
        .filter(m => !modes.includes(m))
        .forEach(mode => it(`should return null of: ${mode}`, () => {
          const result = inst.select(mode);
          expect(result).toBeNull();
        }));
    });

    describe('creation', () => {
      describe('should take values', () => {
        const inst = getInstance(segment, { selected, values });

        it('should have proper instance', () => {
          expect(inst.values === values).toBeFalsy();
          expect(inst.values).toBeInstanceOf(segmentValues()[segment]);
        });

        modes.forEach(mode => it(`should have proper value ${mode}`, () => {
          const instValue = inst.values[mode] as Values;
          const inputValue = values[mode] as Values;
          expect(instValue).toEqual(inputValue);
          expect(instValue.values).toEqual(inputValue.values);
          expect(instValue.values).toHaveLength(inputValue.values.length);
        }));
      });

      modes.forEach(mode => it(`should take selected mode: ${mode}`, () => {
        const inst = getInstance(segment, { selected: mode, values });
        expect(inst.selected).toEqual(mode);
      }));
    });
  }));
});

function getInstance<T extends Segment>(segment: T, input: { selected: SegmentModes<T>, values: SegmentValues<T> }) {
  class Test extends BaseContainer<T> {

    // @ts-ignore
    protected cloneWith(d: any) {
      return new Test(d);
    }

    // @ts-ignore
    protected createValues(values: any) {
      const valuesClass = segmentValues()[segment];
      return new valuesClass(values);
    }

    getSegment() {
      return segment;
    }
  }

  // @ts-ignore
  return new Test(input);
}
