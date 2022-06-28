import { getSegmentValues } from '@lib/ui/utils';
import { Values } from '@lib/types';
import {
  defaultView,
  segments,
  segmentsModes,
  allModes,
  segmentsModesMap
} from './../../../payloads';

describe('UI utils: get segment value', () => {
  segmentsModes()
    .map(([segment, modes]) => modes.map(mode => [segment, mode, defaultView()] as const))
    .flat()
    .forEach(([segment, mode, view]) => it(`should return proper value, segment: ${segment}, mode: ${mode}`, () => {
      const value = view[segment].values[mode] as Values;
      const values = value.values;
      expect(getSegmentValues(view, segment, mode)).toEqual(values);
      expect(getSegmentValues(view, segment, mode)).toHaveLength(values.length);
    }));

  describe('should threw error', () => {
    const view = defaultView();

    segments()
      .map(segment => [
        segment,
        allModes().filter(mode => !segmentsModesMap()[segment].includes(mode))
      ] as const)
      .map(([segment, modes]) => modes.map(mode => [segment, mode] as const))
      .flat()
      .forEach(([segment, mode]) => it(`segment: ${segment}, mode: ${mode}`, () => {
        expect(() => getSegmentValues(view, segment, mode)).toThrow();
      }));
  });
});
