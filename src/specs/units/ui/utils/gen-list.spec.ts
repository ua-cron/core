import { genList } from '@lib/ui/utils/gen-list';

describe('UI utils: gen list', () => {
  it('should return proper list', () => {
    const list = genList(2, 5);
    expect(list[0].value).toBe('2');
    expect(list[0].label).toBe('2');
    expect(list[1].value).toBe('3');
    expect(list[1].label).toBe('3');
    expect(list[2].value).toBe('4');
    expect(list[2].label).toBe('4');
    expect(list[3].value).toBe('5');
    expect(list[3].label).toBe('5');
    expect(list).toHaveLength(4);
  });
});
