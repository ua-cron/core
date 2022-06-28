import { Segment, Type, Mode } from '@lib/enums';

import { Service } from './service.type';
import { Change } from './change.type';
import { ValueState } from './state.type';
import { getView } from './get-view';
import { getApi } from './get-api';

export const applySetValue = (service: Service, change: Change): ValueState => {
  const { segment, mode, type, value } = change;
  const api = getApi(service, type);
  const [primary, secondary] = value;

  if (type !== Type.DAY) {
    if (mode === Mode.INCREMENT) {
      if (secondary) {
        api.setIncrementPrimaryValue(secondary);
      }
      if (primary) {
        api.setIncrementSecondaryValue(primary);
      }
    } else if (mode === Mode.RANGE) {
      api.setRangePrimaryValue(primary);
      if (secondary) {
        api.setRangeSecondaryValue(secondary);
      }
    } else if (mode === Mode.AND) {
      value.forEach(v => api.selectAndValue(v));
    }
  } else {
    if (segment === Segment.dayOfWeek && mode === Mode.INCREMENT) {
      api.setDayOfWeekIncrementPrimary(primary);
      if (secondary) {
        api.setDayOfWeekIncrementSecondary(secondary);
      }
    } else if (segment === Segment.dayOfMonth && mode === Mode.INCREMENT) {
      api.setDayOfMonthIncrementPrimary(primary);
      if (secondary) {
        api.setDayOfMonthIncrementSecondary(secondary);
      }
    } else if (segment === Segment.dayOfWeek && mode === Mode.AND) {
      value.forEach(v => api.selectDayOfWeekAndValue(v));
    } else if (segment === Segment.dayOfMonth && mode === Mode.AND) {
      value.forEach(v => api.selectDayOfMonthAndValue(v));
    } else if (mode === Mode.RANGE) {
      api.setDayOfWeekRangePrimary(primary);
      if (secondary) {
        api.setDayOfWeekRangeSecondary(secondary);
      }
    } else if (mode === Mode.LAST_NTH_DAY_WEEK) {
      api.setDayOfWeekLastNTHDayWeekValue(value[0]);
    } else if (mode === Mode.DAYS_BEFORE_END_MONTH) {
      api.setDayOfMonthDaysBeforeEndMonthValue(value[0]);
    } else if (mode === Mode.NEAREST_WEEKDAY_OF_MONTH) {
      api.setDayOfMonthNearestWeekDayOfMonthValue(value[0]);
    } else if (mode === Mode.NTH_WEEKDAY_OF_MONTH) {
      api.setDayOfWeekNTHWeekDayOfMonthPrimaryValue(primary);
      if (secondary) {
        api.setDayOfWeekNTHWeekDayOfMonthSecondaryValue(secondary);
      }
    }
  }

  const view = getView(service);
  let values = value;
  if (mode === Mode.AND) {
    values = value.map(v => {
     const added = view[segment].values.AND.values.includes(v);
     return `${added ? '+' : '-'}${v}`;
    });
  }

  return {
    [segment]: {
      values: {
        [mode]: {
          values: [...values]
        }
      }
    }
  }
};
