import { parseExpression, stringifyDataModel, getSegmentsList, createValue } from './../utils';
import { Mode, MonthCode, Segment, CronType } from './../enums';
import { SegmentModes, Containers } from './../types';
import { DataModel } from './../data.model';
import {
  applyDataModel,
  isSelectedSegment,
  selectSegmentMode,
  getSegmentValues,
  hasAndValue,
  toggleAndValue,
  setInValue
} from './utils';
import { ViewData } from './view-data.model';

type Listeners = {
  [p: string]: ((view: Containers) => void)[]
};

export abstract class CronUIBaseService {
  private listeners: Listeners = getSegmentsList().reduce((a, s) => ({ ...a, [s]: [] }), {});
  private disabled = false;
  protected readonly abstract cronType: CronType;
  protected view = this.createDefaultView();

  destroy() {
    this.listeners = {};
  }

  listen(segments: Segment[], cb: (view: Containers) => void) {
    segments.forEach(s => {
      this.listeners[s].push(cb);
    });

    return () => {
      segments.forEach(s => {
        const listeners = this.listeners[s] || [];
        this.listeners[s] = listeners.filter(c => c !== cb);
      });
    };
  }

  toString() {
    const model = new DataModel(this.view.getSelected());
    return stringifyDataModel(model, this.cronType);
  }

  fillFromExpression(expression: string) {
    expression = expression.replace(/[ ]{2,}/g, ' ');
    const data = parseExpression(expression, this.cronType);
    this.view = applyDataModel(this.view, data);
    const segments = getSegmentsList();
    this.emitListener(segments);
  }

  setDisabled(disabled = false) {
    this.disabled = disabled;
    const segments = getSegmentsList();
    this.emitListener(segments);
  }

  isDisabled<T extends Segment>(mode?: SegmentModes<T>, segment?: T) {
    let disabled = this.disabled;
    if (segment && mode) {
      const view = this.view.get(segment);
      disabled = disabled || view.selected !== mode;
    }
    return disabled;
  }

  protected selectDaySegment<T extends Segment.dayOfMonth|Segment.dayOfWeek>(mode: SegmentModes<T>, segment: T, reset?: T) {
    this.selectSegment(segment, mode);

    if (reset === Segment.dayOfMonth) {
      this.selectSegment(Segment.dayOfMonth, Mode.NONE);
    }
    if (reset === Segment.dayOfWeek) {
      this.selectSegment(Segment.dayOfWeek, Mode.NONE);
    }
  }

  protected setInValue<T extends Segment>(mode: SegmentModes<T>, index: 0|1, value: string, segment: T) {
    const container = setInValue(this.view, mode, index, value, segment);
    this.setSegmentView(container);
  }

  protected isSelectedSegment<T extends Segment>(segment: T, mode: SegmentModes<T>) {
    return isSelectedSegment(this.view, segment, mode);
  }

  protected getSegmentValues<T extends Segment>(segment: T, mode: SegmentModes<T>) {
    return getSegmentValues(this.view, segment, mode);
  }

  protected getDayApi() {
    return {
      // Every
      isEverySelected: () =>  this.isSelectedSegment(Segment.dayOfWeek, Mode.EVERY),
      selectEvery: () => this.selectDaySegment(Mode.EVERY, Segment.dayOfWeek, Segment.dayOfMonth),

      // Every 5 day(s) starting on Monday
      isDayOfWeekIncrementSelected: () => this.isSelectedSegment(Segment.dayOfWeek, Mode.INCREMENT),
      selectDayOfWeekIncrement: () => this.selectDaySegment(Mode.INCREMENT, Segment.dayOfWeek, Segment.dayOfMonth),
      isDayOfWeekIncrementControlsDisabled: () => this.isDisabled(Mode.INCREMENT, Segment.dayOfWeek),
      getDayOfWeekIncrementPrimary: () => this.getSegmentValues(Segment.dayOfWeek, Mode.INCREMENT)[1],
      setDayOfWeekIncrementPrimary: (value: string) => this.setInValue(Mode.INCREMENT, 1, value, Segment.dayOfWeek),
      getDayOfWeekIncrementSecondary: () => this.getSegmentValues(Segment.dayOfWeek, Mode.INCREMENT)[0],
      setDayOfWeekIncrementSecondary: (value: string) => this.setInValue(Mode.INCREMENT, 0, value, Segment.dayOfWeek),

      // Every 3 day(s) starting on the 4th of the month
      isDayOfMonthIncrementSelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.INCREMENT),
      selectDayOfMonthIncrement: () => this.selectDaySegment(Mode.INCREMENT, Segment.dayOfMonth, Segment.dayOfWeek),
      isDayOfMonthIncrementControlsDisabled: () => this.isDisabled(Mode.INCREMENT, Segment.dayOfMonth),
      getDayOfMonthIncrementPrimary: () => this.getSegmentValues(Segment.dayOfMonth, Mode.INCREMENT)[1],
      setDayOfMonthIncrementPrimary: (value: string) => this.setInValue(Mode.INCREMENT, 1, value, Segment.dayOfMonth),
      getDayOfMonthIncrementSecondary: () => this.getSegmentValues(Segment.dayOfMonth, Mode.INCREMENT)[0],
      setDayOfMonthIncrementSecondary: (value: string) => this.setInValue(Mode.INCREMENT, 0, value, Segment.dayOfMonth),

      // Specific day of week (choose one or many)
      isDayOfWeekAndSelected: () => this.isSelectedSegment(Segment.dayOfWeek, Mode.AND),
      selectDayOfWeekAnd: () => this.selectDaySegment(Mode.AND, Segment.dayOfWeek, Segment.dayOfMonth),
      isDayOfWeekAndControlsDisabled: () => this.isDisabled(Mode.AND, Segment.dayOfWeek),
      isSelectedDayOfWeekAndValue: (value: string) => this.hasAndValue(value, Segment.dayOfWeek),
      selectDayOfWeekAndValue: (value: string) => this.toggleAndValue(value, Segment.dayOfWeek),

      // Specific day of month (choose one or many)
      isDayOfMonthAndSelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.AND),
      selectDayOfMonthAnd: () => this.selectDaySegment(Mode.AND, Segment.dayOfMonth, Segment.dayOfWeek),
      isDayOfMonthAndControlsDisabled: () => this.isDisabled(Mode.AND, Segment.dayOfMonth),
      isSelectedDayOfMonthAndValue: (value: string) => this.hasAndValue(value, Segment.dayOfMonth),
      selectDayOfMonthAndValue: (value: string) => this.toggleAndValue(value, Segment.dayOfMonth)
    }
  }

  protected getCommonApi(segment: Segment) {
    return {
      // Every
      isEverySelected: () => this.isSelectedSegment(segment, Mode.EVERY),
      selectEvery: () => this.selectSegment(segment, Mode.EVERY),

      // Every 2 hour(s) starting at hour 3
      isIncrementSelected: () => this.isSelectedSegment(segment, Mode.INCREMENT),
      selectIncrement: () => this.selectSegment(segment, Mode.INCREMENT),
      isIncrementControlsDisabled: () => this.isDisabled(Mode.INCREMENT, segment),
      getIncrementPrimaryValue: () => this.getSegmentValues(segment, Mode.INCREMENT)[1],
      setIncrementPrimaryValue: (value: string) => this.setInValue(Mode.INCREMENT, 1, value, segment),

      // Specific hour (choose one or many)
      isAndSelected: () => this.isSelectedSegment(segment, Mode.AND),
      selectAnd: () => this.selectSegment(segment, Mode.AND),
      isAndControlsDisabled: () => this.isDisabled(Mode.AND, segment),
      isSelectedAndValue: (value: string) => this.hasAndValue(value, segment),
      selectAndValue: (value: string) => this.toggleAndValue(value, segment),

      // Every hour between hour 0 and hour
      isRangeSelected: () => this.isSelectedSegment(segment, Mode.RANGE),
      selectRange: () => this.selectSegment(segment, Mode.RANGE),
      isRangeControlsDisabled: () => this.isDisabled(Mode.RANGE, segment),
      getRangePrimaryValue: () => this.getSegmentValues(segment, Mode.RANGE)[0],
      setRangePrimaryValue: (value: string) => this.setInValue(Mode.RANGE, 0, value, segment),
      getRangeSecondaryValue: () => this.getSegmentValues(segment, Mode.RANGE)[1],
      setRangeSecondaryValue: (value: string) => this.setInValue(Mode.RANGE, 1, value, segment)
    };
  }

  private setSegmentView(container: Containers) {
    const segment = container.getSegment();
    this.view = this.view.set(container);
    this.emitListener([segment]);
  }

  private hasAndValue(value: string, segment: Segment) {
    return hasAndValue(this.view, value, segment);
  }

  private selectSegment<T extends Segment>(segment: T, mode: SegmentModes<T>) {
    const container = selectSegmentMode(this.view, segment, mode);
    if (!container) {
      return;
    }
    this.setSegmentView(container);
  }

  private toggleAndValue(value: string, segment: Segment) {
    const container = toggleAndValue(this.view, value, segment);
    if (!container) {
      return false;
    }
    this.setSegmentView(container)
    return true;
  }

  private emitListener(segments: Segment[]) {
    segments.forEach(s => {
      const view = this.view.get(s);
      const cbs = this.listeners[s] || [];
      cbs.forEach(cd => cd(view));
    });
  }

  private createValue(mode: Mode, values: string[]) {
    return {
      [mode]: createValue(mode, values)
    };
  }

  private createDefaultView() {
    return new ViewData({
      [Segment.seconds]: {
        selected: Mode.AND,
        values: {
          ...this.createValue(Mode.AND, ['0']),
          ...this.createValue(Mode.RANGE, ['0', '0']),
          ...this.createValue(Mode.INCREMENT, ['0', '1']),
          ...this.createValue(Mode.EVERY, [])
        }
      },
      [Segment.minutes]: {
        selected: Mode.AND,
        values: {
          ...this.createValue(Mode.AND, ['0']),
          ...this.createValue(Mode.RANGE, ['0', '0']),
          ...this.createValue(Mode.INCREMENT, ['0', '1']),
          ...this.createValue(Mode.EVERY, [])
        }
      },
      [Segment.hours]: {
        selected: Mode.AND,
        values: {
          ...this.createValue(Mode.AND, ['0']),
          ...this.createValue(Mode.RANGE, ['0', '0']),
          ...this.createValue(Mode.INCREMENT, ['0', '1']),
          ...this.createValue(Mode.EVERY, [])
        }
      },
      [Segment.month]: {
        selected: Mode.EVERY,
        values: {
          ...this.createValue(Mode.AND, [MonthCode.JAN]),
          ...this.createValue(Mode.RANGE, ['1', '1']),
          ...this.createValue(Mode.INCREMENT, ['1', '1']),
          ...this.createValue(Mode.EVERY, []),
          ...this.createValue(Mode.NONE, [])
        }
      },
      [Segment.dayOfMonth]: {
        selected: Mode.NONE,
        values: {
          ...this.createValue(Mode.AND, ['1']),
          ...this.createValue(Mode.LAST_DAY, []),
          ...this.createValue(Mode.NEAREST_WEEKDAY_OF_MONTH, ['1W']),
          ...this.createValue(Mode.DAYS_BEFORE_END_MONTH, ['L-1']),
          ...this.createValue(Mode.LAST_DAY_WEEK, []),
          ...this.createValue(Mode.RANGE, ['0', '0']),
          ...this.createValue(Mode.INCREMENT, ['1', '1']),
          ...this.createValue(Mode.EVERY, []),
          ...this.createValue(Mode.NONE, [])
        }
      },
      [Segment.dayOfWeek]: {
        selected: Mode.NONE,
        values: {
          ...this.createValue(Mode.AND, ['SUN']),
          ...this.createValue(Mode.INCREMENT, ['1', '1']),
          ...this.createValue(Mode.NTH_WEEKDAY_OF_MONTH, ['1', '1']),
          ...this.createValue(Mode.LAST_NTH_DAY_WEEK, ['1L']),
          ...this.createValue(Mode.RANGE, ['1', '2']),
          ...this.createValue(Mode.EVERY, []),
          ...this.createValue(Mode.NONE, [])
        }
      },
      [Segment.year]: {
        selected: Mode.EVERY,
        values: {
          ...this.createValue(Mode.AND, ['2019']),
          ...this.createValue(Mode.RANGE, ['2019', '2019']),
          ...this.createValue(Mode.INCREMENT, ['2019', '1']),
          ...this.createValue(Mode.EVERY, [])
        }
      }
    });
  }
}
