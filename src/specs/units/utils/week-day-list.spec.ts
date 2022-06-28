import { getWeekDayList } from '@lib/utils';
import { WeekDay } from '@lib/enums';

const list = [
  WeekDay.Sunday,
  WeekDay.Monday,
  WeekDay.Tuesday,
  WeekDay.Wednesday,
  WeekDay.Thursday,
  WeekDay.Friday,
  WeekDay.Saturday
];

describe('Utils: get week day list', () => {
  it('should return proper list', () => {
    const received = getWeekDayList();
    expect(received).toHaveLength(list.length);
    list.forEach((value, i) => expect(received[i]).toBe(value));
  });

  it('should return immutable list', () => {
    const received1 = getWeekDayList();
    const received2 = getWeekDayList();
    expect(received1 === received2).toBeFalsy();
  });
});
