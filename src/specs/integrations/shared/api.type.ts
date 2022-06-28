import { Service } from './service.type';

type Intersect<T> = (T extends any ? ((x: T) => 0) : never) extends ((x: infer R) => 0) ? R : never;
export type Api = Intersect<ReturnType<Service['getApi']>>;
