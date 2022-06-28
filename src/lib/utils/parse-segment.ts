import { Segment, Mode, WeekDay } from '@lib/enums';
import { SegmentModes, SegmentValue } from '@lib/types';
import { getWeekDayList } from './week-day-list';
import { getWeekDayCode } from './week-day';
import { detectMode } from './detect-mode';
import { createValue } from './create-value';
import { parseToValues } from './parse-to-values';
import { isCommonSegment } from './is-segment';
import {
  dayOfWeekAcceptedMode,
  commonAcceptedMode,
  dayOfMonthAcceptedMode,
  monthAcceptedMode
} from './accepted-mode';

export function parseSegment<T extends Segment>(value: string, segment: T): SegmentValue<T>;
export function parseSegment(value: string, segment: Segment) {
  const mode = detectMode(value);
  const rawValues = parseToValues(value, mode);
  const values = normalizeValues(mode, rawValues, segment);

  if (dayOfWeekAcceptedMode(mode) && segment === Segment.dayOfWeek) {
    return createValue(mode, values);
  }
  if (commonAcceptedMode(mode) && isCommonSegment(segment)) {
    return createValue(mode, values);
  }
  if (dayOfMonthAcceptedMode(mode) && segment === Segment.dayOfMonth) {
    return createValue(mode, values);
  }
  if (monthAcceptedMode(mode) && segment === Segment.month) {
    return createValue(mode, values);
  }
  throw `Not available value model for segment: ${segment} and mode: ${mode} of value: ${value}`;
}

const normalizeValues = <T extends Segment>(mode: SegmentModes<T>, values: string[], valueType: T) => {
  // conver 1,2,3 to SUN,MON,TUE
  if (valueType === Segment.dayOfWeek && [Mode.AND, Mode.RANGE].includes(mode)) {
    return values
      .map(v => {
        const value = +v;
        if (isNaN(value)) {
          return v;
        }
        const weekDay = [
          ...getWeekDayList(),
          WeekDay.Sunday
        ][value];
        return getWeekDayCode(weekDay);
      })
      .filter(v => !!v);
  }
  return values;
}
