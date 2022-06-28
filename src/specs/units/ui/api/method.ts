import { Mode, Segment } from '@lib/enums';
import { segments, segmentsModesMap } from './../../../payloads';
import { TestCronQuartzUIService, TestCronUIBaseService } from './../services';

type Services = typeof TestCronQuartzUIService|typeof TestCronUIBaseService;
type FuncName<T extends Services> = T extends typeof TestCronQuartzUIService ? 'testGetDayApi' : ('testGetDayApi'|'testGetCommonApi');

export const getCommonTestMaker = () => {
  const maker = getTestMaker(TestCronUIBaseService, 'testGetCommonApi');
  const createTest = <
    M extends Parameters<typeof maker>[0],
    MO extends Parameters<typeof maker>[1],
    O extends  Parameters<typeof maker>[3]
  >(method: M, mode: MO, option: O) => segments().map(segment => {
    const modes = segmentsModesMap()[segment];
    return maker(method, mode, segment, {
      option,
      modes
    });
  });
  return createTest;
};

export const getTestMaker = <T extends Services, F extends FuncName<T>>(service: T, funcName: F) => {
  type Api = ReturnType<InstanceType<T>[F]>;

  return <
    M extends keyof Api,
    MO extends Mode,
    S extends Segment,
    O
  >(method: M, mode: MO, segment: S, options: O) => {
    type Callback = (
      method: Api[M],
      mode: MO,
      segment: S,
      inst: InstanceType<T>,
      options: O
    ) => void;

    return (fn: Callback) => describe(`api.${method.toString()}(), segment: ${segment}`, () => {
      const inst = new service() as InstanceType<T>;
      const api = (funcName === 'testGetDayApi' ? inst['testGetDayApi']() : inst[funcName](segment)) as Api;

      fn(api[method], mode, segment, inst, options);
    });
  };
};
