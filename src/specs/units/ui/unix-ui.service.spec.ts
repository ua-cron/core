import { Type } from '@lib/enums'
import { TestCronUnixUIService } from './services';

describe('UI: unix service', () => {
  describe('getApi()', () => {
    const inst = new TestCronUnixUIService();
    const api = inst.testGetApi();

    ([
      Type.MINUTES,
      Type.HOURS,
      Type.MONTH,
      Type.DAY
    ] as const).forEach(type => it(type, () => {
      expect(inst.getApi(type)).toEqual(api[type]);
      expect(inst.getApi(type) === api[type]).toBeFalsy();
    }));

    it('should return null', () => {
      // @ts-ignore
      expect(inst.getApi(Type.SECONDS)).toBeNull();
      // @ts-ignore
      expect(inst.getApi(Type.YEAR)).toBeNull();
    });
  });
});
