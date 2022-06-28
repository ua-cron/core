import { getMonthList, getMonthCode } from './../../utils';

export const getMonthCodes = () => getMonthList().map(v => ({
  value: getMonthCode(v),
  label: v
}));
