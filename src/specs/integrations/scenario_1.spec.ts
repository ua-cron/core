import { Mode, Type, Segment } from '@lib/enums';
import { CronQuartzUIService } from '@lib/ui/quartz-ui.service';
import { actions, genSelect, genSetValue } from './shared';

describe('scenario #1', () => {
  const quartz = new CronQuartzUIService();
  const changes = [
    genSelect(Type.HOURS, Mode.AND),
    genSetValue(Type.HOURS, Mode.AND, ['22', '1', '2', '10', '12', '0']),
    genSetValue(Type.HOURS, Mode.AND, ['3', '5', '1', '22']),

    genSelect(Type.SECONDS, Mode.RANGE),
    genSetValue(Type.SECONDS, Mode.RANGE, ['1']),

    genSelect(Type.DAY, Mode.AND, Segment.dayOfWeek),
    genSetValue(Type.DAY, Mode.AND, ['WED', 'THU'], Segment.dayOfWeek),
    genSetValue(Type.DAY, Mode.AND, ['WED'], Segment.dayOfWeek),

    genSelect(Type.YEAR, Mode.INCREMENT),
    genSetValue(Type.YEAR, Mode.INCREMENT, ['2022', '2024']),
    genSetValue(Type.YEAR, Mode.INCREMENT, ['2023']),
    genSetValue(Type.YEAR, Mode.INCREMENT, ['', '2027']),

    genSelect(Type.DAY, Mode.AND, Segment.dayOfMonth),
    genSetValue(Type.DAY, Mode.AND, ['1', '3', '8'], Segment.dayOfMonth),
    genSetValue(Type.DAY, Mode.AND, ['8'], Segment.dayOfMonth),

    genSelect(Type.DAY, Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek),
    genSetValue(Type.DAY, Mode.LAST_NTH_DAY_WEEK, ['2', '4'], Segment.dayOfWeek),

    genSelect(Type.DAY, Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth),
    genSetValue(Type.DAY, Mode.DAYS_BEFORE_END_MONTH, ['7', '8'], Segment.dayOfMonth),
  ];
  const runTests = actions(quartz, changes);
  runTests();

  it('should produce correct expression', () => {
    expect(quartz.toString()).toEqual('1-0 0 2,10,12,3,5 7 * ? 2023/2027');
  });
});
