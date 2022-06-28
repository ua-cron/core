import { WeekDay, WeekDayCode } from '@lib/enums';
import { getDaysOfWeekCodes } from '@lib/ui/utils';

describe('UI utils: get days of week codes', () => {
  it('should return proper list', () => {
    const daysOfWeekCodes = [
      { value: WeekDayCode.SUN, label: WeekDay.Sunday },
      { value: WeekDayCode.MON, label: WeekDay.Monday },
      { value: WeekDayCode.TUE, label: WeekDay.Tuesday },
      { value: WeekDayCode.WED, label: WeekDay.Wednesday },
      { value: WeekDayCode.THU, label: WeekDay.Thursday },
      { value: WeekDayCode.FRI, label: WeekDay.Friday },
      { value: WeekDayCode.SAT, label: WeekDay.Saturday }
    ];

    const list = getDaysOfWeekCodes();
    expect(list).toEqual(daysOfWeekCodes);
    expect(list).toHaveLength(daysOfWeekCodes.length);
  });
});
