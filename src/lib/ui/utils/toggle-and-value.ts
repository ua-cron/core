import { Segment, Mode } from './../../enums';
import { ViewData } from './../view-data.model';
import { getSegmentValues } from './get-segment-value';

export const toggleAndValue = (view: ViewData, value: string, segment: Segment) => {
  const container = view.get(segment);
  const andValue = container.values.get(Mode.AND);
  let values = getSegmentValues(view, segment, Mode.AND);

  const isRemoving = !!~values.indexOf(value);
  if (isRemoving && values.length === 1) {
    return null;
  }

  if (isRemoving) {
    values = values.filter(v => v !== value);
  } else {
    values = [...values, value];
  }
  return container.setValues({
    [Mode.AND]: andValue.clone(values)
  });
};
