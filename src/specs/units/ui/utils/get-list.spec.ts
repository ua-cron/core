import { getList } from '@lib/ui/utils';
import { Segment } from '@lib/enums';
import {
  dayOfWeekOptionsList,
  monthOptionsList,
  dayOfMonthOptionsList,
  secondsOptionsList,
  minutesOptionsList,
  hoursOptionsList,
  yearOptionsList
} from './../../../payloads';

const expects = [
  [Segment.seconds, secondsOptionsList],
  [Segment.minutes, minutesOptionsList],
  [Segment.hours, hoursOptionsList],
  [Segment.month, monthOptionsList],
  [Segment.dayOfMonth, dayOfMonthOptionsList],
  [Segment.dayOfWeek, dayOfWeekOptionsList],
  [Segment.year, yearOptionsList]
] as const;

describe('UI utils: get list', () => {
  it('should return empty array of segment is not supported', () => {
    const notSupported = '' as Segment;
    const list = getList(notSupported);
    expect(list).toHaveLength(0);
  });

  expects.forEach(([segment, fn]) => {
    describe(`should return proper list: ${segment}`, () => {
      [true, false].forEach(every => it(every ? 'every' : 'not every', () => {
        const list = getList(segment, every);
        const expected = fn(every);
        expected.forEach((o, i) => expect(o).toEqual(list[i]));
        expect(list).toEqual(expected);
        expect(list).toHaveLength(expected.length);
      }));
    });
  });

  [
    [2022, 2032],
    [2068, undefined],
    [undefined, 2068]
  ].forEach(([startRange, endRange]) => {
    it(`should return proper list: year, not every, with range start: ${startRange}, end: ${endRange}`, () => {
      const list = getList(Segment.year, false, startRange, endRange);
      const start = yearOptionsList(false).findIndex(d => d.value === (startRange || 2019).toString());
      const end = yearOptionsList(false).findIndex(d => d.value === (endRange || 2098).toString()) + 1;
      const expected = yearOptionsList(false).slice(start, end);

      list.forEach((o, i) => expect(o).toEqual(expected[i]));
      expect(list).toHaveLength(expected.length);
      expect(list).toEqual(expected);
    });
  });
});
