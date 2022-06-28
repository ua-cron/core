import { Mode, Segment } from '@lib/enums';
import { SegmentModes } from '@lib/types';
import { ViewData } from '@lib/ui/view-data.model';
import { segmentContainers, valuesMode, segments, segmentContainerMap } from './../../payloads';

describe('UI: view data model', () => {
  describe('creation', () => {
    const inputs = createViewInputs();
    const view = new ViewData(inputs);

    segmentContainers().forEach(([segment, containerClass]) => it(segment, () => {
      expect(view[segment]).toBeInstanceOf(containerClass);
      expect(inputs[segment]).toEqual(view[segment]);
    }));
  });

  describe('should be immutable', () => {
    const inputs = createViewInputs();
    const view = new ViewData(inputs);

    segmentContainers().forEach(([segment]) => it(segment, () => {
      expect(inputs[segment] === view[segment]).toBeFalsy();
    }));
  });

  describe('get()', () => {
    const inputs = createViewInputs();
    const view = new ViewData(inputs);

    segmentContainers().forEach(([segment, containerClass]) => it(segment, () => {
      expect(view.get(segment)).toBeInstanceOf(containerClass);
      expect(view.get(segment)).toEqual(view[segment]);
      expect(view.get(segment) === view[segment]).toBeFalsy();
    }));
  });

  describe('set()', () => {
    const view = new ViewData(createViewInputs());

    segmentContainers().forEach(([segment, containerClass]) => it(segment, () => {
      const container = new containerClass({ selected: Mode.RANGE, values: {} });
      const result = view.set(container);
      expect(result[segment]).toEqual(container);
      expect(result[segment].getSegment()).toEqual(container.getSegment());
      expect(result[segment] === container).toBeFalsy();
      expect(result[segment]).toBeInstanceOf(containerClass);
    }));
  });

  describe('getSelected()', () => {
    const selectedMap = {
      [Segment.seconds]: Mode.AND,
      [Segment.minutes]: Mode.RANGE,
      [Segment.hours]: Mode.AND,
      [Segment.year]: Mode.RANGE,
      [Segment.month]: Mode.RANGE,
      [Segment.dayOfMonth]: Mode.AND,
      [Segment.dayOfWeek]: Mode.RANGE
    } as const;
    const inputs = createViewInputs(selectedMap);

    describe('all segments should be present', () => {
      const view = new ViewData(inputs);
      const selected = view.getSelected();

      segmentContainers().forEach(([segment]) => it(segment, () => {
        const mode = selectedMap[segment];
        expect(selected[segment] === inputs[segment].values[mode]).toBeFalsy();
        expect(selected[segment]).toEqual(inputs[segment].values[mode]);
        expect(selected[segment]).toBeInstanceOf(valuesMode()[mode]);
      }));
    });

    describe('process missing modes', () => {
      const view = new ViewData(inputs);
      segments().forEach(segment => {
        // @ts-ignore
        view[segment].selected = '' as Mode;
      })

      const selected = view.getSelected();

      segments().forEach(segment => it(`${segment} should be undefined`, () => {
        expect(selected[segment]).toBeUndefined();
      }));
    });

    describe('process partially missing modes', () => {
      const view = new ViewData(inputs);
      const missingSegments = [Segment.dayOfMonth, Segment.minutes];
      missingSegments.forEach(segment => {
        // @ts-ignore
        view[segment].selected = '' as Mode;
      });
      const selected = view.getSelected();

      segmentContainers().forEach(([segment]) => it(segment, () => {
        if (missingSegments.includes(segment)) {
          expect(selected[segment]).toBeUndefined();
          return;
        }
        const mode = selectedMap[segment];
        expect(selected[segment] === inputs[segment].values[mode]).toBeFalsy();
        expect(selected[segment]).toEqual(inputs[segment].values[mode]);
        expect(selected[segment]).toBeInstanceOf(valuesMode()[mode]);
      }));
    });
  });
});

function createViewInputs(modes?: { [prop in Segment]: SegmentModes<prop> }) {
  return segments().reduce((acc, segment) => {
    const mode = modes ? modes[segment] : Mode.AND;
    const values = [Math.random().toString()];
    const value = new (valuesMode()[mode])({ values });
    return {
      ...acc,
      [segment]: new (segmentContainerMap()[segment])({
        selected: Mode.AND,
        values: { [mode]: value }
      }).select(value.getMode())
    };
  }, {} as {
    [prop in Segment]: ViewData[prop]
  });
}
