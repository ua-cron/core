import { Segment, Mode, CronType, ConstantValue } from '@lib/enums';
import { expressionModels, segments, segmentsModesMap, segmentsModes } from './../../payloads';
import { TestCronUIBaseService } from './services';

describe('UI: base service', () => {
  it('initial view', () => {
    const inst = new TestCronUIBaseService(CronType.QUARTZ);
    const view = inst.testGetView();

    expect(view.seconds.selected).toEqual(Mode.AND);
    expect(view.seconds.values.AND.values).toEqual(['0']);
    expect(view.seconds.values.RANGE.values).toEqual(['0', '0']);
    expect(view.seconds.values.INCREMENT.values).toEqual(['0', '1']);
    expect(view.seconds.values.EVERY.values).toEqual([ConstantValue.EVERY]);

    expect(view.minutes.selected).toEqual(Mode.AND);
    expect(view.minutes.values.AND.values).toEqual(['0']);
    expect(view.minutes.values.RANGE.values).toEqual(['0', '0']);
    expect(view.minutes.values.INCREMENT.values).toEqual(['0', '1']);
    expect(view.minutes.values.EVERY.values).toEqual([ConstantValue.EVERY]);

    expect(view.hours.selected).toEqual(Mode.AND);
    expect(view.hours.values.AND.values).toEqual(['0']);
    expect(view.hours.values.RANGE.values).toEqual(['0', '0']);
    expect(view.hours.values.INCREMENT.values).toEqual(['0', '1']);
    expect(view.hours.values.EVERY.values).toEqual([ConstantValue.EVERY]);

    expect(view.month.selected).toEqual(Mode.EVERY);
    expect(view.month.values.AND.values).toEqual(['JAN']);
    expect(view.month.values.RANGE.values).toEqual(['1', '1']);
    expect(view.month.values.INCREMENT.values).toEqual(['1', '1']);
    expect(view.month.values.EVERY.values).toEqual([ConstantValue.EVERY]);
    expect(view.month.values.NONE.values).toEqual([ConstantValue.NONE]);

    expect(view.dayOfMonth.selected).toEqual(Mode.NONE);
    expect(view.dayOfMonth.values.AND.values).toEqual(['1']);
    expect(view.dayOfMonth.values.RANGE.values).toEqual(['0', '0']);
    expect(view.dayOfMonth.values.INCREMENT.values).toEqual(['1', '1']);
    expect(view.dayOfMonth.values.EVERY.values).toEqual([ConstantValue.EVERY]);
    expect(view.dayOfMonth.values.NONE.values).toEqual([ConstantValue.NONE]);
    expect(view.dayOfMonth.values.LAST_DAY.values).toEqual([ConstantValue.LAST_DAY]);
    expect(view.dayOfMonth.values.NEAREST_WEEKDAY_OF_MONTH.values).toEqual(['1W']);
    expect(view.dayOfMonth.values.DAYS_BEFORE_END_MONTH.values).toEqual(['L-1']);
    expect(view.dayOfMonth.values.LAST_DAY_WEEK.values).toEqual([ConstantValue.LAST_DAY_WEEK]);

    expect(view.dayOfWeek.selected).toEqual(Mode.NONE);
    expect(view.dayOfWeek.values.AND.values).toEqual(['SUN']);
    expect(view.dayOfWeek.values.RANGE.values).toEqual(['1', '2']);
    expect(view.dayOfWeek.values.INCREMENT.values).toEqual(['1', '1']);
    expect(view.dayOfWeek.values.EVERY.values).toEqual([ConstantValue.EVERY]);
    expect(view.dayOfWeek.values.NONE.values).toEqual([ConstantValue.NONE]);
    expect(view.dayOfWeek.values.NTH_WEEKDAY_OF_MONTH.values).toEqual(['1', '1']);
    expect(view.dayOfWeek.values.LAST_NTH_DAY_WEEK.values).toEqual(['1L']);

    expect(view.year.selected).toEqual(Mode.EVERY);
    expect(view.year.values.AND.values).toEqual(['2019']);
    expect(view.year.values.RANGE.values).toEqual(['2019', '2019']);
    expect(view.year.values.INCREMENT.values).toEqual(['2019', '1']);
    expect(view.year.values.EVERY.values).toEqual([ConstantValue.EVERY]);
  });

  describe('setDisabled(false)', () => {
    it('should not be globally disabled', () => {
      const inst = new TestCronUIBaseService(CronType.QUARTZ);
      inst.setDisabled(false);
      expect(inst.isDisabled()).toBeFalsy();
    });

    describe('should process', () => {
      expressionModels().forEach(({ expression, model, type }) => describe(`expression: ${expression}, type: ${type}`, () => {
        const inst = new TestCronUIBaseService(type);
        inst.fillFromExpression(expression);
        inst.setDisabled(false);

        segmentsModes().forEach(([segment, modes]) => describe(segment, () => {
          const value = model[segment];
          modes.forEach(mode => describe(mode, () => {
            const toBeFalsy = mode === value.getMode();
            it(`should be ${toBeFalsy ? 'enabled' : 'disabled'}`, () => {
              if (toBeFalsy) {
                expect(inst.isDisabled(mode, segment)).toBeFalsy();
              } else {
                expect(inst.isDisabled(mode, segment)).toBeTruthy();
              }
            });
          }));
        }));
      }));
    });
  });

  describe('setDisabled(true)', () => {
    const inst = new TestCronUIBaseService(CronType.QUARTZ);
    inst.setDisabled(true);
    expect(inst.isDisabled()).toBeTruthy();

    segments().forEach(segment => describe(segment, () => {
      segmentsModesMap()[segment].forEach(mode => it(mode, () => {
        expect(inst.isDisabled(mode, segment)).toBeTruthy();
      }));
    }));
  });

  describe('listen', () => {
    it('should listen', () => {
      const inst = new TestCronUIBaseService(CronType.QUARTZ);
      const onChange = jest.fn();
      inst.listen([Segment.minutes, Segment.hours], onChange);

      inst.fillFromExpression('1 1 3/2 ? * WED *');
      const view = inst.testGetView();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenNthCalledWith(1, view[Segment.minutes]);
      expect(onChange).toHaveBeenNthCalledWith(2, view[Segment.hours]);

      inst.fillFromExpression('2 1 3/2 ? * WED *');
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenNthCalledWith(3, view[Segment.minutes]);
      expect(onChange).toHaveBeenNthCalledWith(4, view[Segment.hours]);

      inst.setDisabled(true);
      expect(onChange).toHaveBeenCalledTimes(6);
      expect(onChange).toHaveBeenNthCalledWith(5, view[Segment.minutes]);
      expect(onChange).toHaveBeenNthCalledWith(6, view[Segment.hours]);
    });

    it('should stop listen after unsubscribe', () => {
      const inst = new TestCronUIBaseService(CronType.QUARTZ);
      const onChange = jest.fn();
      const unsubscribe = inst.listen([Segment.minutes, Segment.hours], onChange);
      inst.fillFromExpression('4 0/1 3/2 ? * WED *');
      expect(onChange).toHaveBeenCalledTimes(2);
      unsubscribe();
      inst.fillFromExpression('4 0/1 3/2 ? * WED *');
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should stop listen after destroy', () => {
      const inst = new TestCronUIBaseService(CronType.QUARTZ);
      const onChange = jest.fn();
      inst.listen([Segment.minutes, Segment.hours], onChange);
      inst.destroy();
      inst.fillFromExpression('4 0/1 3/2 ? * WED *');
      expect(onChange).not.toBeCalled();
    });
  });

  describe('toString()', () => {
    expressionModels().forEach(({ expression, output, model, type }) => {
      it(`should process type: ${type}, expression: ${expression}`, () => {
        const inst = new TestCronUIBaseService(type);
        inst.testSetView(model);
        expect(inst.toString()).toEqual(output);
      });
    });
  });

  describe('fillFromExpression() should process', () => {
    expressionModels().forEach(({ expression, model, type }) => {
      describe(`type: ${type}, expression: ${expression}`, () => {
        const inst = new TestCronUIBaseService(type);
        const oldView = inst.testGetView();
        inst.fillFromExpression(expression);
        const view = inst.testGetView();

        it('view should not be mutable', () => {
          expect(oldView === view).toBeFalsy();
        });

        segments().forEach(segment => describe(segment, () => {
          const container = view[segment];
          const value = model[segment];
          const selected = container.selected;
          const valueMode = value.getMode();

          it(`selected: ${selected}, valueMode: ${valueMode}`, () => {
            expect(selected).toBe(valueMode);
            expect(container.values.get(valueMode)).toEqual(value);
            expect(container.values.get(valueMode) === value).toBeFalsy();
            expect(container.values.get(valueMode)).toBeInstanceOf(value.constructor);
          });
        }));
      });
    });
  });
});
