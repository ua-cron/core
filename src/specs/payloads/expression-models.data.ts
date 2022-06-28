import {
  AndValue,
  NoneValue,
  EveryValue,
  RangeValue,
  LastDayValue,
  IncrementValue,
  LastDayWeekValue,
  LastNthDayWeekValue,
  NthWeekdayOfMonthValue,
  DaysBeforeEndMonthValue,
  NearestWeekdayOfMonthValue
} from '@lib/values';
import { CronType, Segment, WeekDayCode, MonthCode, ConstantValue } from '@lib/enums';
import { DataModel } from '@lib/data.model';

import quartz from './../dataset/quartz-dataset.json';
import unix from './../dataset/unix-dataset.json';
import { daysOfWeekValues } from './day-of-week-options-list';
import { segments, unixSegments } from './segments';
import { monthValues } from './month-options-list';

const quartzDataSet = quartz.map(expression => [expression, CronType.QUARTZ] as const);
const unixDataSet = unix.map(expression => [expression, CronType.UNIX] as const);
const daysOfWeek = daysOfWeekValues();

export const expressionModels = () => [
  ...quartzDataSet,
  ...unixDataSet
].map(([expression, type]) => genData(expression, type));

const normalizeDayOfWeekValues = (segment: Segment, value: string[]) => {
  if (segment !== Segment.dayOfWeek) {
    return value;
  }
  return value
   .map(v => {
    const value = +v;
    if (isNaN(value)) {
      return v;
    }
    return daysOfWeek[value];
  })
  .filter(v => !!v);
};

const parse = (value: string, segment: Segment, cronType: CronType) => {
  value = value.trim();
  if (value === ConstantValue.EVERY) {
    return new EveryValue();
  }
  if (value.includes('/')) {
    const incrementValue = value.split('/');
    if (cronType === CronType.UNIX) {
      incrementValue[0] = '*';
    }
    return new IncrementValue({ values: incrementValue });
  }
  if (value === ConstantValue.LAST_DAY) {
    return new LastDayValue();
  }
  if (value.match(/[0-9]{1}L/i)) {
    return new LastNthDayWeekValue({ values: [value] });
  }
  if (value === ConstantValue.LAST_DAY_WEEK) {
    return new LastDayWeekValue();
  }
  if (value.endsWith('W')) {
    return new NearestWeekdayOfMonthValue({ values: [value] });
  }
  if (value.includes('#')) {
    return new NthWeekdayOfMonthValue({ values: value.split('#') });
  }
  if (value.includes(ConstantValue.NONE)) {
    return new NoneValue();
  }
  if (value.startsWith('L-')) {
    return new DaysBeforeEndMonthValue({ values: [value] });
  }

  const months = monthValues();
  if (value.includes(',') || !isNaN(+value) || daysOfWeek.includes(value as WeekDayCode) || months.includes(value as MonthCode)) {
    return new AndValue({ values: normalizeDayOfWeekValues(segment, value.split(',')) });
  }
  if (value.includes('-')) {
    return new RangeValue({ values: normalizeDayOfWeekValues(segment, value.split('-')) });
  }
  return undefined;
};

const parseExpression = (expression: string, cronType: CronType) => {
  const values = expression.split(' ');
  const typeSegments = cronType === CronType.QUARTZ ? segments(): unixSegments();

  const inputs = typeSegments.reduce((acc, segment, i) => {
    let v = values[i];
    if (cronType === CronType.QUARTZ && segment === Segment.year && !v) {
      v = ConstantValue.EVERY;
    }
    return {
      ...acc,
      [segment]: parse(v, segment, cronType)
    };
  }, {});

  return new DataModel(inputs);
};

const genData = (expression: string|string[], cronType: CronType) => {
  const input = Array.isArray(expression) ? expression[0] : expression;
  const output = Array.isArray(expression) ? expression[1] : expression;
  return {
    type: cronType,
    expression: input,
    output,
    model: parseExpression(input, cronType)
  };
};
