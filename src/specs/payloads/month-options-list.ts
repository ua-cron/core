import { Month, MonthCode } from '@lib/enums';

export const monthOptionsList = (isEvery = false) => {
  return isEvery ? every() : notEvery();
};

export const monthValues = () => [
  MonthCode.JAN,
  MonthCode.FEB,
  MonthCode.MAR,
  MonthCode.APR,
  MonthCode.MAY,
  MonthCode.JUN,
  MonthCode.JUL,
  MonthCode.AUG,
  MonthCode.SEP,
  MonthCode.OCT,
  MonthCode.NOV,
  MonthCode.DEC
];

const every = () => [
  { 'value': '1', 'label': '1' },
  { 'value': '2', 'label': '2' },
  { 'value': '3', 'label': '3' },
  { 'value': '4', 'label': '4' },
  { 'value': '5', 'label': '5' },
  { 'value': '6', 'label': '6' },
  { 'value': '7', 'label': '7' },
  { 'value': '8', 'label': '8' },
  { 'value': '9', 'label': '9' },
  { 'value': '10', 'label': '10' },
  { 'value': '11', 'label': '11' },
  { 'value': '12', 'label': '12' }
];

const notEvery = () => [
  { 'value': '1', 'label': Month.January },
  { 'value': '2', 'label': Month.February },
  { 'value': '3', 'label': Month.March },
  { 'value': '4', 'label': Month.April },
  { 'value': '5', 'label': Month.May },
  { 'value': '6', 'label': Month.June },
  { 'value': '7', 'label': Month.July },
  { 'value': '8', 'label': Month.August },
  { 'value': '9', 'label': Month.September },
  { 'value': '10', 'label': Month.October },
  { 'value': '11', 'label': Month.November },
  { 'value': '12', 'label': Month.December }
];
