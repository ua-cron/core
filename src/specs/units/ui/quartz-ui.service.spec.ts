import { Type } from '@lib/enums'
import { TestCronQuartzUIService } from './services';

describe('UI: quartz service', () => {
  describe('getApi()', () => {
    const inst = new TestCronQuartzUIService();
    const api = inst.testGetApi();

    [
      Type.SECONDS,
      Type.MINUTES,
      Type.HOURS,
      Type.MONTH,
      Type.DAY,
      Type.YEAR
    ].forEach(type => it(type, () => {
      expect(inst.getApi(type)).toEqual(api[type]);
      expect(inst.getApi(type) === api[type]).toBeFalsy();
    }));
  });
});
