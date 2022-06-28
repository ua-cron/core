import { MonthCode, Segment, Mode } from '@lib/enums';
import { createValue } from '@lib/utils';
import { ViewData } from '@lib/ui/view-data.model';

export const defaultView = () => {
  return new ViewData({
    [Segment.seconds]: {
      selected: Mode.AND,
      values: {
        ...createValueBlock(Mode.AND, ['0']),
        ...createValueBlock(Mode.RANGE, ['0', '0']),
        ...createValueBlock(Mode.INCREMENT, ['0', '1']),
        ...createValueBlock(Mode.EVERY, [])
      }
    },
    [Segment.minutes]: {
      selected: Mode.AND,
      values: {
        ...createValueBlock(Mode.AND, ['0']),
        ...createValueBlock(Mode.RANGE, ['0', '0']),
        ...createValueBlock(Mode.INCREMENT, ['0', '1']),
        ...createValueBlock(Mode.EVERY, [])
      }
    },
    [Segment.hours]: {
      selected: Mode.AND,
      values: {
        ...createValueBlock(Mode.AND, ['0']),
        ...createValueBlock(Mode.RANGE, ['0', '0']),
        ...createValueBlock(Mode.INCREMENT, ['0', '1']),
        ...createValueBlock(Mode.EVERY, [])
      }
    },
    [Segment.month]: {
      selected: Mode.EVERY,
      values: {
        ...createValueBlock(Mode.AND, [MonthCode.JAN]),
        ...createValueBlock(Mode.RANGE, ['1', '1']),
        ...createValueBlock(Mode.INCREMENT, ['1', '1']),
        ...createValueBlock(Mode.EVERY, []),
        ...createValueBlock(Mode.NONE, [])
      }
    },
    [Segment.dayOfMonth]: {
      selected: Mode.NONE,
      values: {
        ...createValueBlock(Mode.AND, ['1']),
        ...createValueBlock(Mode.LAST_DAY, []),
        ...createValueBlock(Mode.NEAREST_WEEKDAY_OF_MONTH, ['1W']),
        ...createValueBlock(Mode.DAYS_BEFORE_END_MONTH, ['L-1']),
        ...createValueBlock(Mode.LAST_DAY_WEEK, []),
        ...createValueBlock(Mode.RANGE, ['0', '0']),
        ...createValueBlock(Mode.INCREMENT, ['1', '1']),
        ...createValueBlock(Mode.EVERY, []),
        ...createValueBlock(Mode.NONE, [])
      }
    },
    [Segment.dayOfWeek]: {
      selected: Mode.NONE,
      values: {
        ...createValueBlock(Mode.AND, ['SUN']),
        ...createValueBlock(Mode.INCREMENT, ['1', '1']),
        ...createValueBlock(Mode.NTH_WEEKDAY_OF_MONTH, ['1', '1']),
        ...createValueBlock(Mode.LAST_NTH_DAY_WEEK, ['1L']),
        ...createValueBlock(Mode.RANGE, ['1', '2']),
        ...createValueBlock(Mode.EVERY, []),
        ...createValueBlock(Mode.NONE, [])
      }
    },
    [Segment.year]: {
      selected: Mode.EVERY,
      values: {
        ...createValueBlock(Mode.AND, ['2019']),
        ...createValueBlock(Mode.RANGE, ['2019', '2019']),
        ...createValueBlock(Mode.INCREMENT, ['2019', '1']),
        ...createValueBlock(Mode.EVERY, [])
      }
    }
  });
}

function createValueBlock(mode: Mode, values: string[]) {
  return {
    [mode]: createValue(mode, values)
  };
}
