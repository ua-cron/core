import { isCommonSegment } from '@lib/utils';
import { commonSegments, segments } from './../../payloads';

describe('Utils: is common segment', () => {
  commonSegments()
    .forEach(segment => it(`segment: ${segment} should be a common`, () => {
      expect(isCommonSegment(segment)).toBeTruthy();
    }));

  segments().filter(s => !commonSegments().includes(s))
    .forEach(segment => it(`segment: ${segment} should not be a common`, () => {
      expect(isCommonSegment(segment)).toBeFalsy();
    }));
});
