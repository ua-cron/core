import { getMonthList } from '@lib/utils';
import { monthOptionsList } from './../../payloads';

describe('Utils: get month list', () => {
  it('should return proper list', () => {
    const expected = monthOptionsList().map(({ label }) => label);
    const received = getMonthList();

    expect(received).toHaveLength(expected.length);
    expected.forEach((value, i) => expect(received[i]).toBe(value));
  });

  it('should return immutable list', () => {
    const received1 = getMonthList();
    const received2 = getMonthList();
    expect(received1 === received2).toBeFalsy();
  });
});
