import { Mode } from '@lib/enums';
import { segmentContainerMap, segmentValues, segments } from './../../payloads';

describe('Segment containers', () => {
  segments().forEach(segment => describe(segment, () => {
    const valuesClass = segmentValues()[segment];
    const containerClass = segmentContainerMap()[segment];
    const values = new valuesClass();
    const selected = Mode.AND;
    const container = new containerClass({ selected, values });

    it('creation', () => {
      expect(container.selected).toEqual(selected);
      expect(container.values).toEqual(values);
      expect(container.values === values).toBeFalsy();
      expect(container.values).toBeInstanceOf(valuesClass);
    });

    it('getSegment()', () => {
      expect(container.getSegment()).toEqual(segment);
    });

    it('clone()', () => {
      const clone = container.clone();
      expect(clone).toBeInstanceOf(containerClass);
      expect(clone).toEqual(container);
      expect(clone === container).toBeFalsy();

      expect(clone.values).toBeInstanceOf(valuesClass);
      expect(clone.values).toEqual(container.values);
      expect(clone.values === container.values).toBeFalsy();
    });
  }));
});
