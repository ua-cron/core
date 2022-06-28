import { Segment } from '@lib/enums';
import {
  commonAcceptedMode,
  dayOfMonthAcceptedMode,
  dayOfWeekAcceptedMode,
  monthAcceptedMode
} from '@lib/utils';
import { segmentsModesMap, commonModes, allModes } from './../../payloads';

describe('Utils: accepted mode', () => {
  const dayOfMonthModes = segmentsModesMap()[Segment.dayOfMonth];
  const dayOfWeekModes = segmentsModesMap()[Segment.dayOfWeek];
  const monthModes = segmentsModesMap()[Segment.month];
  const cases = {
    common: allModes().map(mode => [mode, commonModes().includes(mode)] as const),
    dayOfWeek: allModes().map(mode => [mode, dayOfWeekModes.includes(mode)] as const),
    dayOfMonth: allModes().map(mode => [mode, dayOfMonthModes.includes(mode)] as const),
    month: allModes().map(mode => [mode, monthModes.includes(mode)] as const)
  };

  describe('commonAcceptedMode()', () => cases.common.forEach(([mode, state]) => {
    it(`mode ${mode} should be handled as ${state ? 'true' : 'false'}`, () => {
      if (state) {
        expect(commonAcceptedMode(mode)).toBeTruthy()
      } else {
        expect(commonAcceptedMode(mode)).toBeFalsy()
      }
    });
  }));

  describe('dayOfMonthAcceptedMode()', () => cases.dayOfMonth.forEach(([mode, state]) => {
    it(`mode ${mode} should be handled as ${state ? 'true' : 'false'}`, () => {
      if (state) {
        expect(dayOfMonthAcceptedMode(mode)).toBeTruthy()
      } else {
        expect(dayOfMonthAcceptedMode(mode)).toBeFalsy()
      }
    });
  }));

  describe('dayOfWeekAcceptedMode()', () => cases.dayOfWeek.forEach(([mode, state]) => {
    it(`mode ${mode} should be handled as ${state ? 'true' : 'false'}`, () => {
      if (state) {
        expect(dayOfWeekAcceptedMode(mode)).toBeTruthy()
      } else {
        expect(dayOfWeekAcceptedMode(mode)).toBeFalsy()
      }
    });
  }));

  describe('monthAcceptedMode()', () => cases.month.forEach(([mode, state]) => {
    it(`mode ${mode} should be handled as ${state ? 'true' : 'false'}`, () => {
      if (state) {
        expect(monthAcceptedMode(mode)).toBeTruthy()
      } else {
        expect(monthAcceptedMode(mode)).toBeFalsy()
      }
    });
  }));
});
