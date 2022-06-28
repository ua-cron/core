import { Mode, Segment, Type, CronType } from './../enums';
import { CronUIBaseService } from './ui-base.service';

export class CronQuartzUIService extends CronUIBaseService {
  private readonly api = {
    [Type.SECONDS]: this.generateApi(Segment.seconds),
    [Type.MINUTES]: this.generateApi(Segment.minutes),
    [Type.HOURS]: this.generateApi(Segment.hours),
    [Type.MONTH]: this.generateApi(Segment.month),
    [Type.YEAR]: this.generateApi(Segment.year),
    [Type.DAY]: {
      ...this.getDayApi(),

      // Every day between day 0 and day 1
      isDayOfWeekRangeSelected: () => this.isSelectedSegment(Segment.dayOfWeek, Mode.RANGE),
      selectDayOfWeekRange: () => this.selectDaySegment(Mode.RANGE, Segment.dayOfWeek, Segment.dayOfMonth),
      isDayOfWeekRangeControlsDisabled: () => this.isDisabled(Mode.RANGE, Segment.dayOfWeek),
      getDayOfWeekRangePrimary: () => this.getSegmentValues(Segment.dayOfWeek, Mode.RANGE)[0],
      setDayOfWeekRangePrimary: (value: string) => this.setInValue(Mode.RANGE, 0, value, Segment.dayOfWeek),
      getDayOfWeekRangeSecondary: () => this.getSegmentValues(Segment.dayOfWeek, Mode.RANGE)[1],
      setDayOfWeekRangeSecondary: (value: string) => this.setInValue(Mode.RANGE, 1, value, Segment.dayOfWeek),

      // On the last day of the month
      isDayOfMonthLastDaySelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.LAST_DAY),
      selectDayOfMonthLastDay: () => this.selectDaySegment(Mode.LAST_DAY, Segment.dayOfMonth, Segment.dayOfWeek),

      // On the last day of the month
      isDayOfMonthLastDayWeekSelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.LAST_DAY_WEEK),
      selectDayOfMonthLastDayWeek: () => this.selectDaySegment(Mode.LAST_DAY_WEEK, Segment.dayOfMonth, Segment.dayOfWeek),

      // On the last Sunday of the month
      isDayOfWeekLastNTHDayWeekSelected: () => this.isSelectedSegment(Segment.dayOfWeek, Mode.LAST_NTH_DAY_WEEK),
      selectDayOfWeekLastNTHDayWeek: () => this.selectDaySegment(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek, Segment.dayOfMonth),
      isDayOfWeekLastNTHDayWeekControlsDisabled: () => this.isDisabled(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek),
      getDayOfWeekLastNTHDayWeekValue: () => this.getSegmentValues(Segment.dayOfWeek, Mode.LAST_NTH_DAY_WEEK)[0],
      setDayOfWeekLastNTHDayWeekValue: (value: string) => this.setInValue(Mode.LAST_NTH_DAY_WEEK, 0, value, Segment.dayOfWeek),

      // 1 day(s) before the end of the month
      isDayOfMonthDaysBeforeEndMonthSelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.DAYS_BEFORE_END_MONTH),
      selectDayOfMonthDaysBeforeEndMonth: () => this.selectDaySegment(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth, Segment.dayOfWeek),
      isDayOfMonthDaysBeforeEndMonthControlsDisabled: () => this.isDisabled(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth),
      getDayOfMonthDaysBeforeEndMonthValue: () => this.getSegmentValues(Segment.dayOfMonth, Mode.DAYS_BEFORE_END_MONTH)[0],
      setDayOfMonthDaysBeforeEndMonthValue: (value: string) => this.setInValue(Mode.DAYS_BEFORE_END_MONTH, 0, value, Segment.dayOfMonth),

      // Nearest weekday (Monday to Friday) to the 1st of the month
      isDayOfMonthNearestWeekDayOfMonthSelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.NEAREST_WEEKDAY_OF_MONTH),
      selectDayOfMonthNearestWeekDayOfMonth: () => this.selectDaySegment(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth, Segment.dayOfWeek),
      isDayOfMonthNearestWeekDayOfMonthControlsDisabled: () => this.isDisabled(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth),
      getDayOfMonthNearestWeekDayOfMonthValue: () => this.getSegmentValues(Segment.dayOfMonth, Mode.NEAREST_WEEKDAY_OF_MONTH)[0],
      setDayOfMonthNearestWeekDayOfMonthValue: (value: string) => this.setInValue(Mode.NEAREST_WEEKDAY_OF_MONTH, 0, value, Segment.dayOfMonth),

      // On the 1st Sunday of the month
      isDayOfWeekNTHWeekDayOfMonthSelected: () => this.isSelectedSegment(Segment.dayOfWeek, Mode.NTH_WEEKDAY_OF_MONTH),
      selectDayOfWeekNTHWeekDayOfMonth: () => this.selectDaySegment(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, Segment.dayOfMonth),
      isDayOfWeekNTHWeekDayOfMonthControlsDisabled: () => this.isDisabled(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek),
      getDayOfWeekNTHWeekDayOfMonthPrimaryValue: () => this.getSegmentValues(Segment.dayOfWeek, Mode.NTH_WEEKDAY_OF_MONTH)[1],
      setDayOfWeekNTHWeekDayOfMonthPrimaryValue: (value: string) => this.setInValue(Mode.NTH_WEEKDAY_OF_MONTH, 1, value, Segment.dayOfWeek),
      getDayOfWeekNTHWeekDayOfMonthSecondaryValue: () => this.getSegmentValues(Segment.dayOfWeek, Mode.NTH_WEEKDAY_OF_MONTH)[0],
      setDayOfWeekNTHWeekDayOfMonthSecondaryValue: (value: string) => this.setInValue(Mode.NTH_WEEKDAY_OF_MONTH, 0, value, Segment.dayOfWeek)
    }
  };

  protected readonly cronType = CronType.QUARTZ;

  getApi<T extends Type>(type: T): CronQuartzUIService['api'][T] {
    return { ...this.api[type] };
  }

  private generateApi(segment: Segment) {
    return {
      ...this.getCommonApi(segment),
      getIncrementSecondaryValue: () => this.getSegmentValues(segment, Mode.INCREMENT)[0],
      setIncrementSecondaryValue: (value: string) => this.setInValue(Mode.INCREMENT, 0, value, segment)
    };
  }
}
