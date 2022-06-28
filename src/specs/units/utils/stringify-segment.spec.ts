import { CronType, Mode, ConstantValue } from '@lib/enums';
import { stringifySegment } from '@lib/utils';
import { valuesMode, allModes } from './../../payloads';

describe('Utils quartz: stringify segment', () => {
  allModes().forEach(mode => describe(`should stringify ${mode} value`, () => {
    const valueClass = valuesMode()[mode];
    const { QUARTZ, UNIX, common } = getValues(mode);

    [...QUARTZ, ...common].forEach(([output, input]) => {
      it(`should return ${output}, cronType: QUARTZ, values: ${JSON.stringify(input)}`, () => {
        const value = new valueClass({ values: input });
        expect(stringifySegment(value, CronType.QUARTZ)).toBe(output);
      });
    });
    [...UNIX, ...common].forEach(([output, input]) => {
      it(`should return ${output}, cronType: UNIX, values: ${JSON.stringify(input)}`, () => {
        const value = new valueClass({ values: input });
        expect(stringifySegment(value, CronType.UNIX)).toBe(output);
      });
    });
  }));
});

function getValues(mode: Mode) {
  const map = {
    [Mode.EVERY]: { common: [[ConstantValue.EVERY, [ConstantValue.EVERY]]] },
    [Mode.AND]: { common: [['1,2,3,4,5,6,7', ['1', '2', '3', '4', '5', '6', '7']]] },
    [Mode.RANGE]: { common: [['1-7', ['1', '7']]] },
    [Mode.INCREMENT]: {
      [CronType.UNIX]: [
        ['*/7', ['*', '7']],
        ['*/7', ['2', '7']]
      ],
      [CronType.QUARTZ]: [['2/7', ['2', '7']]]
    },
    [Mode.LAST_DAY]: { common: [[ConstantValue.LAST_DAY, [ConstantValue.LAST_DAY]]] },
    [Mode.NONE]: { common: [[ConstantValue.NONE, [ConstantValue.NONE]]] },
    [Mode.DAYS_BEFORE_END_MONTH]: { common: [['L-1', ['L-1']]] },
    [Mode.LAST_DAY_WEEK]: { common: [[ConstantValue.LAST_DAY_WEEK, [ConstantValue.LAST_DAY_WEEK]]] },
    [Mode.LAST_NTH_DAY_WEEK]: { common: [['1L', ['1L']]] },
    [Mode.NEAREST_WEEKDAY_OF_MONTH]: { common: [['6W', ['6W']]] },
    [Mode.NTH_WEEKDAY_OF_MONTH]: { common: [['2#3', ['2', '3']]] }
  } as const;

  return {
    [CronType.QUARTZ]: [],
    [CronType.UNIX]: [],
    common: [],
    ...map[mode]
  };
}
