import { Segment, Type, CronType } from './../enums';
import { CronUIBaseService } from './ui-base.service';

type UnixType = Type.DAY|Type.HOURS|Type.MINUTES|Type.MONTH;

export class CronUnixUIService extends CronUIBaseService {
  private readonly api = {
    [Type.MINUTES]: this.getCommonApi(Segment.minutes),
    [Type.HOURS]: this.getCommonApi(Segment.hours),
    [Type.MONTH]: this.getCommonApi(Segment.month),
    [Type.DAY]: this.getDayApi()
  };
  protected readonly cronType = CronType.UNIX;

  getApi<T extends UnixType>(type: T): CronUnixUIService['api'][T];
  getApi(type: UnixType) {
    const api = this.api[type];
    return api ? { ...api } : null;
  }
}
