import { setInValue } from '@lib/ui/utils';
import { Values } from '@lib/types';
import {
  defaultView,
  segmentsModes,
  segmentContainerMap,
  valuesConstant,
  valuesConstantModes
} from './../../../payloads';

const segmentModes = () => segmentsModes()
  .map(([segment, modes]) => modes.map(mode => [segment, mode] as const))
  .map(items => [
    ...items.map(i => [...i, 0] as const),
    ...items.map(i => [...i, 1] as const)
  ])
  .flat();

describe('UI utils: set in value', () => {
  describe('should add value', () => {
    const view = defaultView();

    segmentModes()
      // @ts-ignore
      .filter(([, mode]) => !valuesConstantModes().includes(mode))
      .forEach(([segment, mode, position]) => {
        it(`position: ${position}, segment: ${segment}, mode: ${mode}`, () => {
          const expected = Date.now().toString();
          const container = setInValue(view, mode, position, expected, segment);
          const { values } = container.values[mode] as Values;
          expect(values[position]).toEqual(expected);
        });
      });
  });

  describe('should not change constant values', () => {
    const view = defaultView();

    segmentModes()
      // @ts-ignore
      .filter(([, mode]) => valuesConstantModes().includes(mode))
      .forEach(([segment, mode, position]) => {
        it(`position: ${position}, segment: ${segment}, mode: ${mode}`, () => {
          const container = setInValue(view, mode, position, '2', segment);
          const { values } = container.values[mode] as Values;
          // @ts-ignore
          const expected = valuesConstant()[mode];
          expect(values).toEqual([expected]);
          expect(values).toHaveLength(1);
        });
      });
  });

  describe('should return proper container instance', () => {
    segmentModes().forEach(([segment, mode, position]) => {
      const view = defaultView();

      it(`position: ${position}, segment: ${segment}, mode: ${mode}`, () => {
        const container = setInValue(view, mode, position, '0', segment);
        expect(container).not.toBeNull();
        expect(container).toBeInstanceOf(segmentContainerMap()[segment]);
      })
    });
  });
});
