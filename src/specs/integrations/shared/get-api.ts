import { Type } from '@lib/enums';

import { Service } from './service.type';
import { Api } from './api.type';

export const getApi = <T extends Type>(service: Service, type: T): Api => {
  // @ts-ignore
  return service.getApi(type);
};
