import { CronType, Mode, Segment, ConstantValue } from '@lib/enums';
import { parseExpression } from '@lib/utils';
import { expressionModels, segments, valuesMode } from './../../payloads';

describe('Utils: parse expression', () => {
  [CronType.QUARTZ, CronType.UNIX].forEach(cronType => {
    describe(`should return mode: ${Mode.AND} if segment value is empty, cronType: ${cronType}`, () => {
      const result = parseExpression('       ', cronType);

      segments().forEach(segment => it(`segment: ${segment}`, () => {
        let mode = Mode.AND;
        let value: string[] = [];
        if (segment === Segment.year || (segment === Segment.seconds && cronType === CronType.UNIX)) {
          mode = Mode.EVERY;
          value = [ConstantValue.EVERY];
        }
        expect(result[segment].getMode()).toEqual(mode);
        expect(result[segment]).toBeInstanceOf(valuesMode()[mode]);
        expect(result[segment].values).toEqual(value);
        expect(result[segment].values).toHaveLength(value.length);
      }));
    });

    it(`should return proper data model if expression is empty and cronType: ${cronType}`, () => {
      const result = parseExpression('', cronType);

      ([
        [Segment.minutes, Mode.AND, ['0']],
        [Segment.hours, Mode.AND, ['0']],
        [Segment.month, Mode.EVERY, [ConstantValue.EVERY]],
        [Segment.dayOfWeek, Mode.EVERY, [ConstantValue.EVERY]],
        [Segment.year, Mode.EVERY, [ConstantValue.EVERY]],
      ] as const).forEach(([segment, mode, values]) => {
        expect(result[segment].getMode()).toEqual(mode);
        expect(result[segment]).toBeInstanceOf(valuesMode()[mode]);
        expect(result[segment].values).toEqual(values);
        expect(result[segment].values).toHaveLength(values.length);
      });

      expect(result.seconds.values).toHaveLength(1);
      expect(result.dayOfMonth.values).toHaveLength(1);

      if (cronType === CronType.QUARTZ) {
        expect(result.seconds.getMode()).toEqual(Mode.AND);
        expect(result.seconds).toBeInstanceOf(valuesMode()[Mode.AND]);
        expect(result.seconds.values).toEqual(['0']);

        expect(result.dayOfMonth.getMode()).toEqual(Mode.NONE);
        expect(result.dayOfMonth).toBeInstanceOf(valuesMode()[Mode.NONE]);
        expect(result.dayOfMonth.values).toEqual([ConstantValue.NONE]);
      } else {
        expect(result.seconds.getMode()).toEqual(Mode.EVERY);
        expect(result.seconds).toBeInstanceOf(valuesMode()[Mode.EVERY]);
        expect(result.seconds.values).toEqual([ConstantValue.EVERY]);

        expect(result.dayOfMonth.getMode()).toEqual(Mode.EVERY);
        expect(result.dayOfMonth).toBeInstanceOf(valuesMode()[Mode.EVERY]);
        expect(result.dayOfMonth.values).toEqual([ConstantValue.EVERY]);
      }
    });
  });

  describe('should return proper data model', () => {
    expressionModels().forEach(({ type, expression, model }) => {
      describe(`type: ${type}, expression: ${expression}`, () => {
        const result = parseExpression(expression, type);

        segments().forEach(segment => it(`segment: ${segment}`, () => {
          const resultValue = result[segment];
          const modelValue = model[segment];

          expect(resultValue).toEqual(modelValue);
          expect(resultValue.getMode()).toBe(modelValue.getMode());
          expect(resultValue).toBeInstanceOf(valuesMode()[modelValue.getMode()]);
        }));
      });
    });
  });
});
