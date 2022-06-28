import { applyDataModel } from '@lib/ui/utils';
import { defaultView, segments, expressionModels, valuesMode } from './../../../payloads';

describe('UI utils: apply data model', () => {
  const view = defaultView();

  expressionModels().forEach(({ model, expression, type }) => {
    const result = applyDataModel(view, model);
    const cases = segments().map(segment => [
      segment,
      model[segment],
      model[segment].getMode(),
      result[segment].values[model[segment].getMode()]
    ] as const);

    describe(`expression: ${expression}, cronType: ${type}`, () => {
      cases.forEach(([segment, modelValue, mode, resultValue]) => describe(`segment: ${segment}, mode: ${mode}`, () => {
        it('value should be a copy of model value', () => expect(resultValue === modelValue).toBeFalsy());
        it('values should be instance of correct class', () => expect(resultValue).toBeInstanceOf(valuesMode()[mode]));
        it('should fill correct values', () => expect(resultValue).toEqual(modelValue));
        it('should select correct mode', () => expect(result[segment].selected).toEqual(mode));
      }));
    });
  });
});
