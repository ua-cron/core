import { testIsControlsDisabled } from './day-tests/is-controls-disabled';
import { testIsSelected } from './day-tests/is-selected';
import { testGetValue } from './day-tests/get-value';
import { testSetValue } from './day-tests/set-value';
import { testSelect } from './day-tests/select';

describe('UI: quartz service: api', () => {
  testIsSelected([
    'isDayOfWeekRangeSelected',
    'isDayOfMonthLastDaySelected',
    'isDayOfMonthLastDayWeekSelected',
    'isDayOfWeekLastNTHDayWeekSelected',
    'isDayOfMonthDaysBeforeEndMonthSelected',
    'isDayOfMonthNearestWeekDayOfMonthSelected',
    'isDayOfWeekNTHWeekDayOfMonthSelected'
  ]);

  testSelect([
    'selectDayOfWeekRange',
    'selectDayOfMonthLastDay',
    'selectDayOfMonthLastDayWeek',
    'selectDayOfWeekLastNTHDayWeek',
    'selectDayOfMonthDaysBeforeEndMonth',
    'selectDayOfMonthNearestWeekDayOfMonth',
    'selectDayOfWeekNTHWeekDayOfMonth'
  ]);

  testIsControlsDisabled([
    'isDayOfWeekRangeControlsDisabled',
    'isDayOfWeekLastNTHDayWeekControlsDisabled',
    'isDayOfMonthDaysBeforeEndMonthControlsDisabled',
    'isDayOfMonthNearestWeekDayOfMonthControlsDisabled',
    'isDayOfWeekNTHWeekDayOfMonthControlsDisabled'
  ]);

  testGetValue([
    'getDayOfWeekRangePrimary',
    'getDayOfWeekRangeSecondary',
    'getDayOfWeekLastNTHDayWeekValue',
    'getDayOfMonthDaysBeforeEndMonthValue',
    'getDayOfMonthNearestWeekDayOfMonthValue',
    'getDayOfWeekNTHWeekDayOfMonthPrimaryValue',
    'getDayOfWeekNTHWeekDayOfMonthSecondaryValue'
  ]);

  testSetValue([
    'setDayOfWeekRangePrimary',
    'setDayOfWeekRangeSecondary',
    'setDayOfWeekLastNTHDayWeekValue',
    'setDayOfMonthDaysBeforeEndMonthValue',
    'setDayOfMonthNearestWeekDayOfMonthValue',
    'setDayOfWeekNTHWeekDayOfMonthPrimaryValue',
    'setDayOfWeekNTHWeekDayOfMonthSecondaryValue'
  ]);
});
