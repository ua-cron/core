import { Month, MonthCode } from './../enums';

const codeMap = {
  [Month.January]: MonthCode.JAN,
  [Month.February]: MonthCode.FEB,
  [Month.March]: MonthCode.MAR,
  [Month.April]: MonthCode.APR,
  [Month.May]: MonthCode.MAY,
  [Month.June]: MonthCode.JUN,
  [Month.July]: MonthCode.JUL,
  [Month.August]: MonthCode.AUG,
  [Month.September]: MonthCode.SEP,
  [Month.October]: MonthCode.OCT,
  [Month.November]: MonthCode.NOV,
  [Month.December]: MonthCode.DEC
};

export const getMonthCode = (weekDay: Month) => codeMap[weekDay];
export const getMonthDay = (code: MonthCode) => {
  const keys = Object.keys(codeMap) as (keyof typeof codeMap)[];
  const info = keys.find(key => {
    const value = codeMap[key];
    return value === code;
  })
  return info || null;
}

