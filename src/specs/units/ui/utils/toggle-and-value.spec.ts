import { toggleAndValue } from '@lib/ui/utils';
import { Containers } from '@lib/types';
import { AndValue } from '@lib/values';
import { defaultView, segmentContainerMap, segments } from './../../../payloads';

describe('UI utils: toggle and value', () => {
  segments().forEach(segment => describe(`segment: ${segment}`, () => {
    it('should add value', () => {
      const view = defaultView();
      const value = '12';
      const container = toggleAndValue(view, value, segment) as Containers;
      expect(container).not.toBeNull();

      const expected = [
        ...view[segment].values.AND.values,
        value
      ];
      expect(container.values.AND.values).toEqual(expected);
      expect(container.values.AND.values).toHaveLength(expected.length);
    });

    it('should remove value', () => {
      const view = defaultView();
      const values = ['10', '11'];

      // @ts-ignore
      view[segment].values.AND = new AndValue({
        values: [...values]
      });

      const container = toggleAndValue(view, values[0], segment) as Containers;
      expect(container).not.toBeNull();
      expect(container.values.AND.values).toEqual([values[1]]);
      expect(container.values.AND.values).toHaveLength(1);
    });

    it('should proper container instance', () => {
      const view = defaultView();
      const container = toggleAndValue(view, Date.now().toString(), segment);
      expect(container).not.toBeNull();
      expect(container).toBeInstanceOf(segmentContainerMap()[segment]);
    });

    it('should not remove last value and return null', () => {
      const view = defaultView();
      const values = ['10'];
      // @ts-ignore
      view[segment].values.AND = new AndValue({
        values: [...values]
      });

      const container = toggleAndValue(view, values[0], segment);
      expect(container).toBeNull();
    });
  }));
});
