import { getWeekDayCode, getWeekDay } from '@lib/utils';
import { WeekDay, WeekDayCode } from '@lib/enums';

describe('Utils: week day', () => {
  it('getWeekDayCode should return proper code', () => {
    expect(getWeekDayCode(WeekDay.Sunday)).toBe(WeekDayCode.SUN);
    expect(getWeekDayCode(WeekDay.Monday)).toBe(WeekDayCode.MON);
    expect(getWeekDayCode(WeekDay.Tuesday)).toBe(WeekDayCode.TUE);
    expect(getWeekDayCode(WeekDay.Wednesday)).toBe(WeekDayCode.WED);
    expect(getWeekDayCode(WeekDay.Thursday)).toBe(WeekDayCode.THU);
    expect(getWeekDayCode(WeekDay.Friday)).toBe(WeekDayCode.FRI);
    expect(getWeekDayCode(WeekDay.Saturday)).toBe(WeekDayCode.SAT);
  });

  it('getWeekDayCode should return undefined if day of week not existent', () => {
    const notSupportedCode = '' as WeekDay;
    expect(getWeekDayCode(notSupportedCode)).toBeUndefined();
  });

  it('getWeekDay should return proper day of week', () => {
    expect(getWeekDay(WeekDayCode.SUN)).toBe(WeekDay.Sunday);
    expect(getWeekDay(WeekDayCode.MON)).toBe(WeekDay.Monday);
    expect(getWeekDay(WeekDayCode.TUE)).toBe(WeekDay.Tuesday);
    expect(getWeekDay(WeekDayCode.WED)).toBe(WeekDay.Wednesday);
    expect(getWeekDay(WeekDayCode.THU)).toBe(WeekDay.Thursday);
    expect(getWeekDay(WeekDayCode.FRI)).toBe(WeekDay.Friday);
    expect(getWeekDay(WeekDayCode.SAT)).toBe(WeekDay.Saturday);
  });

  it('getWeekDay should return undefined if day of week code not existent', () => {
    const notSupportedCode = '' as WeekDayCode;
    expect(getWeekDay(notSupportedCode)).toBeNull();
  });
});
