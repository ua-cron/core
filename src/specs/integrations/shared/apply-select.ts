import { Segment, Type, Mode } from '@lib/enums';

import { Service } from './service.type';
import { Change } from './change.type';
import { getApi } from './get-api';
import { SelectedState } from './state.type';

export const applySelect = (service: Service, change: Change): SelectedState => {
  const { segment, mode, type } = change;
  const api = getApi(service, type);
  const resetDayOfMonth = {
    [Segment.dayOfMonth]: { selected: Mode.NONE }
  };
  const resetDayOfWeek = {
    [Segment.dayOfWeek]: { selected: Mode.NONE }
  };
  let extra = {};

  if (type !== Type.DAY) {
    if (mode === Mode.EVERY) {
      api.selectEvery();
    } else if (mode === Mode.INCREMENT) {
      api.selectIncrement();
    } else if (mode === Mode.RANGE) {
      api.selectRange();
    } else if (mode === Mode.AND) {
      api.selectAnd();
    }
  } else {
    if (mode === Mode.EVERY) {
      api.selectEvery();
      extra = resetDayOfMonth;
    } else if (segment === Segment.dayOfWeek && mode === Mode.INCREMENT) {
      api.selectDayOfWeekIncrement();
      extra = resetDayOfMonth;
    } else if (segment === Segment.dayOfMonth && mode === Mode.INCREMENT) {
      api.selectDayOfMonthIncrement();
      extra = resetDayOfWeek;
    } else if (segment === Segment.dayOfWeek && mode === Mode.AND) {
      api.selectDayOfWeekAnd();
      extra = resetDayOfMonth;
    } else if (segment === Segment.dayOfMonth && mode === Mode.AND) {
      api.selectDayOfMonthAnd();
      extra = resetDayOfWeek;
    } else if (mode === Mode.RANGE) {
      api.selectDayOfWeekRange();
      extra = resetDayOfMonth;
    } else if (mode === Mode.LAST_DAY) {
      api.selectDayOfMonthLastDay();
      extra = resetDayOfWeek;
    } else if (mode === Mode.LAST_DAY_WEEK) {
      api.selectDayOfMonthLastDayWeek();
      extra = resetDayOfWeek;
    } else if (mode === Mode.LAST_NTH_DAY_WEEK) {
      api.selectDayOfWeekLastNTHDayWeek();
      extra = resetDayOfMonth;
    } else if (mode === Mode.DAYS_BEFORE_END_MONTH) {
      api.selectDayOfMonthDaysBeforeEndMonth();
      extra = resetDayOfWeek;
    } else if (mode === Mode.NEAREST_WEEKDAY_OF_MONTH) {
      api.selectDayOfMonthNearestWeekDayOfMonth();
      extra = resetDayOfWeek;
    } else if (mode === Mode.NTH_WEEKDAY_OF_MONTH) {
      api.selectDayOfWeekNTHWeekDayOfMonth();
      extra = resetDayOfMonth;
    }
  }

  return {
    ...extra,
    [segment]: {
      selected: mode
    }
  };
};
