import { Separator, Mode } from './../enums';

const separatorsMap = new Map<Mode, Separator>([
  [Mode.AND, Separator.AND],
  [Mode.RANGE, Separator.RANGE],
  [Mode.INCREMENT, Separator.INCREMENT],
  [Mode.NTH_WEEKDAY_OF_MONTH, Separator.NTH_WEEKDAY_OF_MONTH]
]);

export const getSeparator = (mode: Mode) => separatorsMap.get(mode);
export const containsSeparator = (mode: Mode) => separatorsMap.has(mode);
