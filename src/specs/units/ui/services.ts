import { Mode, Segment, Type, CronType } from '@lib/enums';
import { applyDataModel } from '@lib/ui/utils';
import { DataModel } from '@lib/data.model';
import { CronQuartzUIService } from '@lib/ui/quartz-ui.service';
import { CronUnixUIService } from '@lib/ui/unix-ui.service';
import { CronUIBaseService } from '@lib/ui/ui-base.service';

export class TestCronUIBaseService extends CronUIBaseService {
  protected readonly cronType;
  constructor(cronType = CronType.QUARTZ) {
    super();
    this.cronType = cronType;
  }
  testSetSelectedMode(segment: Segment, mode: Mode) {
    // @ts-ignore
    this.view[segment].selected = mode;
  }
  testGetSelected(segment: Segment) {
    return this.view[segment].selected;
  }
  testSetValues(segment: Segment, mode: Mode, values: string[]) {
    // @ts-ignore
    this.view[segment].values[mode].values = values;
  }
  testGetValues(segment: Segment, mode: Mode) {
    // @ts-ignore
    return this.view[segment].values[mode].values;
  }
  testSetDisabled(state: boolean) {
    // @ts-ignore
    this.disabled = state;
  }
  testGetCommonApi(segment: Segment) {
    return super.getCommonApi(segment);
  }
  testGetDayApi() {
    return super.getDayApi();
  }
  testGetView() {
    return this.view;
  }
  testSetView(data: DataModel) {
    this.view = applyDataModel(this.view, data);
  }
}

export class TestCronUnixUIService extends CronUnixUIService {
  testGetApi() {
    // @ts-ignore
    return this.api;
  }
}

export class TestCronQuartzUIService extends CronQuartzUIService {
  testGetApi() {
    // @ts-ignore
    return this.api;
  }
  testGetCommonApi(segment: Segment) {
    return super.getCommonApi(segment);
  }
  testSetSelectedMode(segment: Segment, mode: Mode) {
    // @ts-ignore
    this.view[segment].selected = mode;
  }
  testGetSelected(segment: Segment) {
    return this.view[segment].selected;
  }
  testGetDayApi() {
    return this.getApi(Type.DAY);
  }
  testGetValues(segment: Segment, mode: Mode) {
    // @ts-ignore
    return this.view[segment].values[mode].values;
  }
  testSetValues(segment: Segment, mode: Mode, values: string[]) {
    // @ts-ignore
    this.view[segment].values[mode].values = values;
  }
  testSetDisabled(state: boolean) {
    // @ts-ignore
    this.disabled = state;
  }
}
