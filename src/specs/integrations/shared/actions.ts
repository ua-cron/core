import { segments, segmentsModesMap } from './../../payloads';
import { Change } from './change.type';
import { Service } from './service.type';
import { ViewState } from './state.type';
import { Action } from './action.enum';
import { getView } from './get-view';
import { applySelect } from './apply-select';
import { applySetValue } from './apply-set-value';
import { mergeChanges } from './merge-changes';
import { mergeStates } from './merge-states';
import { genIsSelectedTest } from './gen-is-selected-test';
import { genValuesTest } from './gen-values-test';

export const actions = (service: Service, changes: Change[]) => {
  const prevView = getView(service);
  const updates = changes.map(change => {
    if (change.action === Action.SELECT) {
      return applySelect(service, change);
    }
    return applySetValue(service, change);
  });

  const changesState = mergeChanges(updates);
  const nextState = mergeStates(changesState, prevView);
  return () => runTest(nextState, service);
};

const runTest = (state: ViewState, service: Service) => {
  return segments()
    .forEach(segment => describe(segment, () => {
      const { selected, values } = state[segment];
      describe('test selected', () => genIsSelectedTest(service, segment, selected));

      segmentsModesMap()[segment].forEach(mode => describe(`test values of ${segment} ${mode}`, () => {
        const value = values[mode];
        genValuesTest(service, mode, segment, value.values);
      }));
    }));
};
