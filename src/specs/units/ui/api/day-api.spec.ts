import { testIsSelectedAndValue } from './day-tests/is-selected-and-value';
import { testIsControlsDisabled } from './day-tests/is-controls-disabled';
import { testSelectAndValue } from './day-tests/select-and-value';
import { testIsSelected } from './day-tests/is-selected';
import { testGetValue } from './day-tests/get-value';
import { testSetValue } from './day-tests/set-value';
import { testSelect } from './day-tests/select';

describe('UI: base service: day api', () => {
  testIsSelected([
    'isEverySelected',
    'isDayOfWeekIncrementSelected',
    'isDayOfMonthIncrementSelected',
    'isDayOfWeekAndSelected',
    'isDayOfMonthAndSelected'
  ]);

  testSelect([
    'selectEvery',
    'selectDayOfWeekIncrement',
    'selectDayOfMonthIncrement',
    'selectDayOfWeekAnd',
    'selectDayOfMonthAnd'
  ]);

  testIsControlsDisabled([
    'isDayOfWeekIncrementControlsDisabled',
    'isDayOfMonthIncrementControlsDisabled',
    'isDayOfWeekAndControlsDisabled',
    'isDayOfMonthAndControlsDisabled'
  ]);

  testGetValue([
    'getDayOfWeekIncrementPrimary',
    'getDayOfWeekIncrementSecondary',
    'getDayOfMonthIncrementPrimary',
    'getDayOfMonthIncrementSecondary'
  ]);

  testSetValue([
    'setDayOfWeekIncrementPrimary',
    'setDayOfWeekIncrementSecondary',
    'setDayOfMonthIncrementPrimary',
    'setDayOfMonthIncrementSecondary'
  ]);

  testIsSelectedAndValue([
    'isSelectedDayOfWeekAndValue',
    'isSelectedDayOfMonthAndValue'
  ]);

  testSelectAndValue([
    'selectDayOfWeekAndValue',
    'selectDayOfMonthAndValue'
  ]);
});
