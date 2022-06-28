import { getSegmentsList } from '@lib/utils';
import { segments } from './../../payloads';

describe('Utils: get segments list', () => {
  it('should return proper list', () => {
    const received = getSegmentsList();
    const expected = segments();

    expect(received).toHaveLength(expected.length);
    expected.forEach((value, i) => expect(received[i]).toBe(value));
  });

  it('should return immutable list', () => {
    const received1 = getSegmentsList();
    const received2 = getSegmentsList();
    expect(received1 === received2).toBeFalsy();
  });
});
