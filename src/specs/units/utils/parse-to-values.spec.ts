import { Mode, ConstantValue } from '@lib/enums';
import { parseToValues } from '@lib/utils';
import { allModes } from './../../payloads';

describe('Utils: parse to values', () => {
  allModes()
    .map(mode => [mode, getCases()[mode]] as const)
    .map(([mode, cases]) => cases.map(v => [mode, v] as const))
    .flat()
    .forEach(([mode, [value, expected]]) => it(`should handle mode: ${mode}, value: ${value}`, () => {
      expect(parseToValues(value, mode)).toEqual(expected);
      expect(parseToValues(value, mode)).toHaveLength(expected.length);
    }));

  it('should handle not supported mode', () => {
    const notSupportedMode = '' as Mode;
    const values = ['1'];
    expect(parseToValues(values[0], notSupportedMode)).toEqual(values);
    expect(parseToValues(values[0], notSupportedMode)).toHaveLength(values.length);
  });
});

function getCases() {
  return {
    [Mode.AND]: [
      ['1,2', ['1', '2']],
      [',2', ['2']],
      ['2,', ['2']],
      ['0,2', ['0', '2']],
      ['1,0', ['1', '0']]
    ],
    [Mode.DAYS_BEFORE_END_MONTH]: [['1', ['1']]],
    [Mode.INCREMENT]: [['2/4', ['2', '4']]],
    [Mode.RANGE]: [['1-2', ['1', '2']]],
    [Mode.LAST_DAY]: [
      [ConstantValue.LAST_DAY, [ConstantValue.LAST_DAY]],
      ['0', [ConstantValue.LAST_DAY]]
    ],
    [Mode.LAST_DAY_WEEK]: [
      [ConstantValue.LAST_DAY_WEEK, [ConstantValue.LAST_DAY_WEEK]],
      ['9', [ConstantValue.LAST_DAY_WEEK]]
    ],
    [Mode.EVERY]: [
      [ConstantValue.EVERY, [ConstantValue.EVERY]],
      ['8', [ConstantValue.EVERY]]
    ],
    [Mode.NONE]: [
      [ConstantValue.NONE, [ConstantValue.NONE]],
      ['-', [ConstantValue.NONE]]
    ],
    [Mode.LAST_NTH_DAY_WEEK]: [['1', ['1']]],
    [Mode.NEAREST_WEEKDAY_OF_MONTH]: [['1', ['1']]],
    [Mode.NTH_WEEKDAY_OF_MONTH]: [['1#2', ['1', '2']]]
  } as const;
}
