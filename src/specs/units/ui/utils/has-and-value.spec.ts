import { hasAndValue } from '@lib/ui/utils';
import { AndValue } from '@lib/values';
import { defaultView, segments } from './../../../payloads';

describe('UI utils: has and value', () => {
  segments().forEach(segment => {
    const view = defaultView();

    it(`should return true`, () => {
      const values = [
        Math.random().toString(),
        Math.random().toString(),
        Math.random().toString(),
        Math.random().toString()
      ];

      // @ts-ignore
      view[segment].values.AND = new AndValue({
        values: [...values]
      });

      values.forEach(v => expect(hasAndValue(view, v, segment)).toBeTruthy());
    });

    it(`should return false`, () => {
      expect(hasAndValue(view, Date.now().toString(), segment)).toBeFalsy();
    });
  });
});
