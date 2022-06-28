import { getWeekDayList, getWeekDayCode } from './../../utils';

export const getDaysOfWeekCodes = () => getWeekDayList().map(v => ({
  value: getWeekDayCode(v),
  label: v
}));
