import { createOptions } from '@lib/ui/utils/create-options';

describe('UI utils: create options', () => {
  it('should return proper options', () => {
    const labels = ['#1', '#2', '#3', '#4'];
    const options = createOptions(labels);

    expect(labels).toHaveLength(options.length);

    labels.forEach((originalLabel, i) => {
      const { label, value } = options[i];
      expect(label).toBe(originalLabel);
      expect(value).toBe(`${i + 1}`);
    })
  });
});
