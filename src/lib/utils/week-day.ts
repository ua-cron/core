import { WeekDay, WeekDayCode } from './../enums';

const codeMap = {
  [WeekDay.Sunday]: WeekDayCode.SUN,
  [WeekDay.Monday]: WeekDayCode.MON,
  [WeekDay.Tuesday]: WeekDayCode.TUE,
  [WeekDay.Wednesday]: WeekDayCode.WED,
  [WeekDay.Thursday]: WeekDayCode.THU,
  [WeekDay.Friday]: WeekDayCode.FRI,
  [WeekDay.Saturday]: WeekDayCode.SAT
};

export const getWeekDayCode = (weekDay: WeekDay) => codeMap[weekDay];
export const getWeekDay = (code: WeekDayCode) => {
  const keys = Object.keys(codeMap) as (keyof typeof codeMap)[];
  const info = keys.find(key => {
    const value = codeMap[key];
    return value === code;
  })
  return info || null;
}
