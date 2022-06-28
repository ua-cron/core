import { ViewData } from '@lib/ui/view-data.model';
import { Service } from './service.type';

export const getView = (service: Service) => {
  // @ts-ignore
  const view = service['view'];
  return new ViewData(view);
};
