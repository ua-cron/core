import { mergeWith } from 'lodash';
import { State, SelectedState, ValueState } from './state.type';

export const mergeChanges = (changes: (SelectedState|ValueState)[]): State => {
  // @ts-ignore
  return mergeWith(...changes, (objValue: any, srcValue: any) => {
    if (Array.isArray(objValue)) {
      const isAnd = objValue.some(v => v.startsWith('-') || v.startsWith('+'));

      if (isAnd) {
        return objValue.concat(srcValue);
      }
      objValue[0] = srcValue[0] || objValue[0];
      objValue[1] = srcValue[1] || objValue[1];
      return objValue;
    }
    return undefined;
  });
}
