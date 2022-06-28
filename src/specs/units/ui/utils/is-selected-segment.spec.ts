import { isSelectedSegment } from '@lib/ui/utils';
import { defaultView, segmentsModes } from './../../../payloads';

describe('UI utils: is selected segment', () => {
  const view = defaultView();

  segmentsModes()
    .map(([segment, modes]) => modes.map(mode => [segment, mode] as const))
    .flat()
    .forEach(([segment, mode]) => {
      it(`should be selected mode ${mode} of segment ${segment}`, () => {
        // @ts-ignore
        view[segment].selected = mode;

        expect(isSelectedSegment(view, segment, mode)).toBeTruthy();
      });
    });
});
