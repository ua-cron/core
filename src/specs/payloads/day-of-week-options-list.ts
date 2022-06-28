import { WeekDay, WeekDayCode } from '@lib/enums';

export const dayOfWeekOptionsList = (isEvery = false) => {
  return isEvery ? every() : notEvery();
};

export const daysOfWeekValues = () => [
  WeekDayCode.SUN,
  WeekDayCode.MON,
  WeekDayCode.TUE,
  WeekDayCode.WED,
  WeekDayCode.THU,
  WeekDayCode.FRI,
  WeekDayCode.SAT,
  WeekDayCode.SUN
];

const every = () => [
  { 'value': '1', 'label': '1' },
  { 'value': '2', 'label': '2' },
  { 'value': '3', 'label': '3' },
  { 'value': '4', 'label': '4' },
  { 'value': '5', 'label': '5' },
  { 'value': '6', 'label': '6' },
  { 'value': '7', 'label': '7' }
];

const notEvery = () => [
  { 'value': '1', 'label': WeekDay.Sunday },
  { 'value': '2', 'label': WeekDay.Monday },
  { 'value': '3', 'label': WeekDay.Tuesday },
  { 'value': '4', 'label': WeekDay.Wednesday },
  { 'value': '5', 'label': WeekDay.Thursday },
  { 'value': '6', 'label': WeekDay.Friday },
  { 'value': '7', 'label': WeekDay.Saturday }
];
