import { Mode } from '@lib/enums';
import { ViewData } from '@lib/ui/view-data.model';

import { segments, segmentsModesMap } from './../../payloads';
import { State, ViewState } from './state.type';

export const mergeStates = (changesState: State, view: ViewData) => {
  const viewState = JSON.parse(JSON.stringify(view)) as ViewState;

  segments().forEach(segment => {
    const viewContainer = viewState[segment];
    const changeContainer = changesState[segment];
    if (!changeContainer) {
      return;
    }
    viewContainer.selected = changeContainer.selected || viewContainer.selected;

    const viewValues = viewContainer.values;
    const changeValues = changeContainer.values;
    if (!changeValues) {
      return;
    }

    segmentsModesMap()[segment].forEach(mode => {
      const viewValue = viewValues[mode];
      const changeValue = changeValues[mode];

      if (!changeValue) {
        return;
      }

      if (mode === Mode.AND) {
        return mergeAndValues(changeValue, viewValue);
      } else if ([Mode.INCREMENT, Mode.RANGE].includes(mode)) {
        return mergeRangeIncrementValues(changeValue, viewValue);
      }

      viewValue.values = [...changeValue.values];
    });
  });

  return viewState;
};

const mergeRangeIncrementValues = (changeValue: { values: string[] }, viewValue: { values: string[] }) => {
  viewValue.values[0] = changeValue.values[0];
  viewValue.values[1] = changeValue.values[1] || viewValue.values[1];
};

const mergeAndValues = (changeValue: { values: string[] }, viewValue: { values: string[] }) => {
  changeValue.values.forEach((v: string) => {
    const parsed = v.replace('-', '').replace('+', '');
    const toRemove = v[0] === '-';
    if (toRemove) {
      viewValue.values = viewValue.values.filter(v => v !== parsed);
    } else {
      viewValue.values.push(parsed);
    }
  });
};
