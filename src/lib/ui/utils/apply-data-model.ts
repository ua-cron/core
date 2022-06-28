import { Segment } from './../../enums';
import { DataModel } from './../../data.model';
import { ViewData } from './../view-data.model';

export const applyDataModel = (view: ViewData, data: DataModel) => {
  const {
    seconds,
    minutes,
    hours,
    month,
    dayOfMonth,
    dayOfWeek,
    year
  } = data;

  const secondsMode = seconds.getMode();
  const nextSeconds = view.seconds.setValues({ [secondsMode]: seconds }).select(secondsMode);
  const minutesMode = minutes.getMode();
  const nextMinutes = view.minutes.setValues({ [minutesMode]: minutes }).select(minutesMode);
  const hoursMode = hours.getMode();
  const nextHours = view.hours.setValues({ [hoursMode]: hours }).select(hoursMode);
  const monthMode = month.getMode();
  const nextMonth = view.month.setValues({ [monthMode]: month }).select(monthMode);
  const dayOfMonthMode = dayOfMonth.getMode();
  const nextDayOfMonth = view.dayOfMonth.setValues({ [dayOfMonthMode]: dayOfMonth }).select(dayOfMonthMode);
  const dayOfWeekMode = dayOfWeek.getMode();
  const nextDayOfWeek = view.dayOfWeek.setValues({ [dayOfWeekMode]: dayOfWeek }).select(dayOfWeekMode);
  const yearMode = year.getMode();
  const nextYear = view.year.setValues({ [yearMode]: year }).select(yearMode);

  return new ViewData({
    [Segment.seconds]: nextSeconds,
    [Segment.minutes]: nextMinutes,
    [Segment.hours]: nextHours,
    [Segment.month]: nextMonth,
    [Segment.dayOfMonth]: nextDayOfMonth,
    [Segment.dayOfWeek]: nextDayOfWeek,
    [Segment.year]: nextYear
  });
};
