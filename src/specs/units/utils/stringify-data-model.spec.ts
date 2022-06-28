import { stringifyDataModel } from '@lib/utils';
import { expressionModels } from './../../payloads';

describe('Utils: stringify data model', () => {
  expressionModels().forEach(({ type, output, expression, model }) => {
    it(`should return proper expression, type: ${type}, expression: ${expression}`, () => {
      expect(stringifyDataModel(model, type)).toBe(output);
    });
  });
});
