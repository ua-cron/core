import { Month, MonthCode } from '@lib/enums';
import { getMonthCodes } from '@lib/ui/utils';

describe('UI utils: get month codes', () => {
  it('should return proper list', () => {
    const monthCodes = [
      { value: MonthCode.JAN, label: Month.January },
      { value: MonthCode.FEB, label: Month.February },
      { value: MonthCode.MAR, label: Month.March },
      { value: MonthCode.APR, label: Month.April },
      { value: MonthCode.MAY, label: Month.May },
      { value: MonthCode.JUN, label: Month.June },
      { value: MonthCode.JUL, label: Month.July },
      { value: MonthCode.AUG, label: Month.August },
      { value: MonthCode.SEP, label: Month.September },
      { value: MonthCode.OCT, label: Month.October },
      { value: MonthCode.NOV, label: Month.November },
      { value: MonthCode.DEC, label: Month.December }
    ];

    const list = getMonthCodes();
    expect(list).toEqual(monthCodes);
    expect(list).toHaveLength(monthCodes.length);
  });
});
