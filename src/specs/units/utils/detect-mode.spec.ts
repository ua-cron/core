import { Mode, ConstantValue } from '@lib/enums';
import { detectMode } from '@lib/utils';
import { allModes } from './../../payloads';

const map = {
  [Mode.DAYS_BEFORE_END_MONTH]: ['L-3', 'L-10'],
  [Mode.AND]: ['1,3', '1', '0'],
  [Mode.RANGE]: ['1-3', '2-9'],
  [Mode.LAST_DAY]: [ConstantValue.LAST_DAY],
  [Mode.LAST_DAY_WEEK]: [ConstantValue.LAST_DAY_WEEK],
  [Mode.LAST_NTH_DAY_WEEK]: ['1L', '5L'],
  [Mode.NEAREST_WEEKDAY_OF_MONTH]: ['1W', '5W'],
  [Mode.INCREMENT]: ['1/2', '5/7'],
  [Mode.NTH_WEEKDAY_OF_MONTH]: ['5#3', '1#8'],
  [Mode.EVERY]: [ConstantValue.EVERY],
  [Mode.NONE]: [ConstantValue.NONE]
};

describe('Utils: detect mode', () => {
  it('should detect and mode if value is not handled', () => {
    expect(detectMode('')).toBe(Mode.AND);
    expect(detectMode(' ')).toBe(Mode.AND);
  });

  allModes().forEach(mode => {
    it(`should detect mode: ${mode} by value: ${map[mode]}`, () => {
      map[mode].forEach(v => expect(detectMode(v)).toBe(mode))
    });

    allModes()
      .filter(key => key !== mode)
      .map(key => map[key])
      .flat()
      .forEach(v => it(`should not detect mode: ${mode} by value: ${v}`, () => {
        expect(detectMode(v)).not.toBe(mode);
      }));
  });
});
