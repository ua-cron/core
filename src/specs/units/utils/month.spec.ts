import { getMonthCode, getMonthDay } from '@lib/utils';
import { Month, MonthCode } from '@lib/enums';

describe('Utils: month', () => {
  it('getMonthCode should return proper code', () => {
    expect(getMonthCode(Month.January)).toBe(MonthCode.JAN);
    expect(getMonthCode(Month.February)).toBe(MonthCode.FEB);
    expect(getMonthCode(Month.March)).toBe(MonthCode.MAR);
    expect(getMonthCode(Month.April)).toBe(MonthCode.APR);
    expect(getMonthCode(Month.May)).toBe(MonthCode.MAY);
    expect(getMonthCode(Month.June)).toBe(MonthCode.JUN);
    expect(getMonthCode(Month.July)).toBe(MonthCode.JUL);
    expect(getMonthCode(Month.August)).toBe(MonthCode.AUG);
    expect(getMonthCode(Month.September)).toBe(MonthCode.SEP);
    expect(getMonthCode(Month.October)).toBe(MonthCode.OCT);
    expect(getMonthCode(Month.November)).toBe(MonthCode.NOV);
    expect(getMonthCode(Month.December)).toBe(MonthCode.DEC);
  });

  it('getMonthCode should return undefined if month not existent', () => {
    const notSupported = '' as Month;
    expect(getMonthCode(notSupported)).toBeUndefined();
  });

  it('getMonthDay should return proper month', () => {
    expect(getMonthDay(MonthCode.JAN)).toBe(Month.January);
    expect(getMonthDay(MonthCode.FEB)).toBe(Month.February);
    expect(getMonthDay(MonthCode.MAR)).toBe(Month.March);
    expect(getMonthDay(MonthCode.APR)).toBe(Month.April);
    expect(getMonthDay(MonthCode.MAY)).toBe(Month.May);
    expect(getMonthDay(MonthCode.JUN)).toBe(Month.June);
    expect(getMonthDay(MonthCode.JUL)).toBe(Month.July);
    expect(getMonthDay(MonthCode.AUG)).toBe(Month.August);
    expect(getMonthDay(MonthCode.SEP)).toBe(Month.September);
    expect(getMonthDay(MonthCode.OCT)).toBe(Month.October);
    expect(getMonthDay(MonthCode.NOV)).toBe(Month.November);
    expect(getMonthDay(MonthCode.DEC)).toBe(Month.December);
  });

  it('getMonthDay should return nul if month code not existent', () => {
    const notSupportedCode = '' as MonthCode;
    expect(getMonthDay(notSupportedCode)).toBeNull();
  });
});
