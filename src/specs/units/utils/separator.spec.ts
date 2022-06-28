import { getSeparator, containsSeparator } from '@lib/utils';
import { Separator, Mode } from '@lib/enums';

describe('Utils: separator', () => {
  getCases().forEach(([mode, separator]) => {
    it(`getSeparator should return proper separator: ${separator} for mode: ${mode}`, () => {
      expect(getSeparator(mode)).toBe(separator);
    });

    it(`containsSeparator should return proper status: ${separator} for mode: ${mode}`, () => {
      if (separator) {
        expect(containsSeparator(mode)).toBeTruthy();
      } else {
        expect(containsSeparator(mode)).toBeFalsy();
      }
    });
  });
});

function getCases() {
  return [
    [Mode.NONE, undefined],
    [Mode.NEAREST_WEEKDAY_OF_MONTH, undefined],
    [Mode.DAYS_BEFORE_END_MONTH, undefined],
    [Mode.LAST_NTH_DAY_WEEK, undefined],
    [Mode.LAST_DAY_WEEK, undefined],
    [Mode.LAST_DAY, undefined],
    [Mode.EVERY, undefined],
    [Mode.AND, Separator.AND],
    [Mode.RANGE, Separator.RANGE],
    [Mode.INCREMENT, Separator.INCREMENT],
    [Mode.NTH_WEEKDAY_OF_MONTH, Separator.NTH_WEEKDAY_OF_MONTH],
  ] as const;
}
