import { getMonthEveryList } from '@lib/utils';
import { dayOfMonthOptionsList } from './../../payloads';

describe('Utils: get month every list', () => {
  it('should return proper list', () => {
    const expected = dayOfMonthOptionsList(true).map(({ label }) => label);
    const received = getMonthEveryList();

    expect(received).toHaveLength(expected.length);
    expected.forEach((value, i) => expect(received[i]).toBe(value));
  });

  it('should return immutable list', () => {
    const received1 = getMonthEveryList();
    const received2 = getMonthEveryList();
    expect(received1 === received2).toBeFalsy();
  });
});
