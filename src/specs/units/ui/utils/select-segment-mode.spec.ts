import { selectSegmentMode } from '@lib/ui/utils';
import { Segment } from '@lib/enums';
import {
  segmentsModes,
  defaultView,
  segmentContainerMap,
  commonModes,
  segmentsModesMap
} from './../../../payloads';

describe('UI utils: select segment mode', () => {
  segmentsModes()
    .map(([segment, modes]) => modes.map(mode => [segment, mode] as const))
    .flat()
    .forEach(([segment, mode]) => describe(`mode: ${mode}, segment ${segment}`, () => {
      const view = defaultView();
      const container = selectSegmentMode(view, segment, mode);

      it('should select', () => expect(container.selected).toEqual(mode));
      it('should return clone of container', () => expect(container === view[segment]).toBeFalsy());
      it('should return proper instance of container', () => expect(container).toBeInstanceOf(segmentContainerMap()[segment]));
    }));

  describe('should return null', () => {
    const view = defaultView();
    const dayOfMonthModes = segmentsModesMap()[Segment.dayOfMonth];
    const dayOfWeekModes = segmentsModesMap()[Segment.dayOfWeek];
    const monthModes = segmentsModesMap()[Segment.month];
    const notAcceptedCommon = [...dayOfMonthModes, ...dayOfWeekModes, ...monthModes].filter(m => !commonModes().includes(m));
    const notAcceptedDayOfWeek = dayOfMonthModes.filter(m => !dayOfWeekModes.includes(m));
    const notAcceptedDayOfMonth = dayOfWeekModes.filter(m => !dayOfMonthModes.includes(m));
    const notAcceptedMonthModes = [...dayOfMonthModes, ...dayOfWeekModes].filter(m => !monthModes.includes(m));

    const cases = [
      [Segment.seconds, notAcceptedCommon],
      [Segment.minutes, notAcceptedCommon],
      [Segment.hours, notAcceptedCommon],
      [Segment.year, notAcceptedCommon],
      [Segment.month, notAcceptedMonthModes],
      [Segment.dayOfMonth, notAcceptedDayOfMonth],
      [Segment.dayOfWeek, notAcceptedDayOfWeek]
    ] as const;

    cases
      .map(([segment, modes]) => modes.map(mode => [segment, mode] as const))
      .flat()
      .forEach(([segment, mode]) => it(`segment: ${segment}, mode: ${mode}`, () => {
        expect(selectSegmentMode(view, segment, mode)).toBeNull();
      }));
  });
});
