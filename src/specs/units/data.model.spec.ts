import { AndValue, EveryValue } from '@lib/values';
import { DataModel } from '@lib/data.model';
import { ConstantValue } from '@lib/enums';

describe('Data model', () => {
  it('should handle values passed', () => {
    const seconds = new AndValue({ values: ['1'] });
    const minutes = new AndValue({ values: ['2'] });
    const hours = new AndValue({ values: ['3'] });
    const month = new AndValue({ values: ['4'] });
    const year = new AndValue({ values: ['5'] });
    const dayOfMonth = new AndValue({ values: ['6'] });
    const dayOfWeek = new AndValue({ values: ['7'] });

    const model = new DataModel({
      seconds,
      minutes,
      hours,
      month,
      year,
      dayOfMonth,
      dayOfWeek
    });

    expect(model.seconds).toBeInstanceOf(AndValue);
    expect(model.seconds.values).toEqual(seconds.values);
    expect(model.seconds === seconds).toBeFalsy();
    expect(model.seconds.values === seconds.values).toBeFalsy();

    expect(model.minutes).toBeInstanceOf(AndValue);
    expect(model.minutes.values).toEqual(minutes.values);
    expect(model.minutes === minutes).toBeFalsy();
    expect(model.minutes.values === minutes.values).toBeFalsy();

    expect(model.hours).toBeInstanceOf(AndValue);
    expect(model.hours.values).toEqual(hours.values);
    expect(model.hours === hours).toBeFalsy();
    expect(model.hours.values === hours.values).toBeFalsy();

    expect(model.month).toBeInstanceOf(AndValue);
    expect(model.month.values).toEqual(month.values);
    expect(model.month === month).toBeFalsy();
    expect(model.month.values === month.values).toBeFalsy();

    expect(model.dayOfMonth).toBeInstanceOf(AndValue);
    expect(model.dayOfMonth.values).toEqual(dayOfMonth.values);
    expect(model.dayOfMonth === dayOfMonth).toBeFalsy();
    expect(model.dayOfMonth.values === dayOfMonth.values).toBeFalsy();

    expect(model.dayOfWeek).toBeInstanceOf(AndValue);
    expect(model.dayOfWeek.values).toEqual(dayOfWeek.values);
    expect(model.dayOfWeek === dayOfWeek).toBeFalsy();
    expect(model.dayOfWeek.values === dayOfWeek.values).toBeFalsy();

    expect(model.year).toBeInstanceOf(AndValue);
    expect(model.year.values).toEqual(year.values);
    expect(model.year === year).toBeFalsy();
    expect(model.year.values === year.values).toBeFalsy();
  });

  it('should handle no values passed', () => {
    const model = new DataModel({});
    expect(model.seconds).toBeInstanceOf(EveryValue);
    expect(model.seconds.values).toEqual([ConstantValue.EVERY]);
    expect(model.minutes).toBeInstanceOf(EveryValue);
    expect(model.minutes.values).toEqual([ConstantValue.EVERY]);
    expect(model.hours).toBeInstanceOf(EveryValue);
    expect(model.hours.values).toEqual([ConstantValue.EVERY]);
    expect(model.dayOfMonth).toBeInstanceOf(EveryValue);
    expect(model.dayOfMonth.values).toEqual([ConstantValue.EVERY]);
    expect(model.month).toBeInstanceOf(EveryValue);
    expect(model.month.values).toEqual([ConstantValue.EVERY]);
    expect(model.dayOfWeek).toBeInstanceOf(EveryValue);
    expect(model.dayOfWeek.values).toEqual([ConstantValue.EVERY]);
    expect(model.year).toBeInstanceOf(EveryValue);
    expect(model.year.values).toEqual([ConstantValue.EVERY]);
  });
});
