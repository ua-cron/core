import { Segment, Mode, ConstantValue } from '@lib/enums';
import { parseSegment } from '@lib/utils';
import { segments, valuesMode, segmentsModesMap, allModes } from './../../payloads';

describe('Utils parse segment', () => {
  segments().forEach(segment => {
    describe(`should fail, segment: ${segment}`, () => allModes()
      .filter(m => !segmentsModesMap()[segment].includes(m))
      .map(mode => [getValues()[mode], mode] as const)
      .map(([list, mode]) => list.map(([value]) => [value, mode] as const))
      .flat()
      .forEach(([value, mode]) => it(`mode: ${mode}, value: ${value}`, () => {
        expect(() => parseSegment(value, segment)).toThrow();
      })));

    describe(`should handle segment: ${segment}`, () => segmentsModesMap()[segment]
      .map(mode => [mode, getValues()[mode]] as const)
      .map(([mode, [[value, result]]]) => {
        if (segment === Segment.dayOfWeek) {
          if (mode === Mode.AND) {
            result = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
          } else if (mode === Mode.RANGE) {
            result = ['MON', 'SUN'];
          }
        }
        return [mode, value, result] as const;
      })
      .forEach(([mode, value, result]) => it(`mode: ${mode}, value: ${value}`, () => {
        const valueInst = parseSegment(value, segment);
        expect(valueInst).toBeInstanceOf(valuesMode()[mode]);
        expect(valueInst.values).toEqual(result);
        expect(valueInst.values).toHaveLength(result.length);
      })));
  });
});

function getValues() {
  return {
    [Mode.EVERY]: [[ConstantValue.EVERY, [ConstantValue.EVERY]]],
    [Mode.AND]: [['1,2,3,4,5,6,7', ['1', '2', '3', '4', '5', '6', '7']]],
    [Mode.RANGE]: [['1-7', ['1', '7']]],
    [Mode.INCREMENT]: [['2/7', ['2', '7']]],
    [Mode.LAST_DAY]: [[ConstantValue.LAST_DAY, [ConstantValue.LAST_DAY]]],
    [Mode.NONE]: [[ConstantValue.NONE, [ConstantValue.NONE]]],
    [Mode.DAYS_BEFORE_END_MONTH]: [['L-1', ['L-1']]],
    [Mode.LAST_DAY_WEEK]: [[ConstantValue.LAST_DAY_WEEK, [ConstantValue.LAST_DAY_WEEK]]],
    [Mode.LAST_NTH_DAY_WEEK]: [['1L', ['1L']]],
    [Mode.NEAREST_WEEKDAY_OF_MONTH]: [['6W', ['6W']]],
    [Mode.NTH_WEEKDAY_OF_MONTH]: [['2#3', ['2', '3']]],
  } as { [prop in Mode]: [string, string[]][] };
}
