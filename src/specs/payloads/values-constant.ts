import { Mode, ConstantValue } from '@lib/enums';

export const valuesConstantModes = () => [
  Mode.EVERY,
  Mode.NONE,
  Mode.LAST_DAY_WEEK,
  Mode.LAST_DAY
] as const;

export const valuesConstant = () => ({
  [Mode.EVERY]: ConstantValue.EVERY,
  [Mode.NONE]: ConstantValue.NONE,
  [Mode.LAST_DAY_WEEK]: ConstantValue.LAST_DAY_WEEK,
  [Mode.LAST_DAY]: ConstantValue.LAST_DAY
}) as const;
