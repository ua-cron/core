import { Segment, CronType, ConstantValue } from './../enums';
import { AndValue, NoneValue } from './../values';
import { DataModel } from './../data.model';
import { parseSegment } from './../utils';

export const parseExpression = (expression?: string, cronType = CronType.QUARTZ) => {
  if (!expression) {
    return getDefaults(cronType);
  }

  const {
    seconds,
    minutes,
    hours,
    dayOfMonth,
    month,
    dayOfWeek,
    year
  } = getValues(expression, cronType);

  const minutesValue = parseSegment(minutes, Segment.minutes);
  const hoursValue = parseSegment(hours, Segment.hours);
  const dayOfMonthValue = parseSegment(dayOfMonth, Segment.dayOfMonth);
  const monthValue = parseSegment(month, Segment.month);
  const dayOfWeekValue = parseSegment(dayOfWeek, Segment.dayOfWeek);

  const options = {
    [Segment.minutes]: minutesValue,
    [Segment.hours]: hoursValue,
    [Segment.dayOfMonth]: dayOfMonthValue,
    [Segment.month]: monthValue,
    [Segment.dayOfWeek]: dayOfWeekValue
  }

  if (cronType === CronType.UNIX) {
    return new DataModel(options);
  }

  const secondsValue = parseSegment(seconds, Segment.seconds);
  const yearValue = parseSegment(year, Segment.year);
  return new DataModel({
    ...options,
    [Segment.seconds]: secondsValue,
    [Segment.year]: yearValue
  });
};

const getDefaults = (cronType: CronType) => {
  const unix = {
    [Segment.minutes]: new AndValue({ values: ['0'] }),
    [Segment.hours]: new AndValue({ values: ['0'] })
  };

  const quartz = {
    ...unix,
    [Segment.seconds]: new AndValue({ values: ['0'] }),
    [Segment.dayOfMonth]: new NoneValue()
  };
  return new DataModel(cronType === CronType.QUARTZ ? quartz : unix);
};

const getValues = (expression: string, cronType: CronType) => {
  const segments = cronType === CronType.QUARTZ ? [
    Segment.seconds,
    Segment.minutes,
    Segment.hours,
    Segment.dayOfMonth,
    Segment.month,
    Segment.dayOfWeek,
    Segment.year
  ] : [
    Segment.minutes,
    Segment.hours,
    Segment.dayOfMonth,
    Segment.month,
    Segment.dayOfWeek
  ];
  const values = expression.split(' ').slice(0, segments.length);
  return segments.reduce((acc, segment, i) => {
    let value = values[i];
    if (cronType === CronType.QUARTZ && segment === Segment.year && !value) {
      value = ConstantValue.EVERY;
    }
    return {
      ...acc,
      [segment]: value || ''
    };
  }, {} as { [prop in Segment]: string });
};
