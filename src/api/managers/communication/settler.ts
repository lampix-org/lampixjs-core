import { Settler, SettlerMap, LampixResponse } from '../../../types';

import { publisher } from '../../../publisher';
import { LampixEvents, eventToCallbackMap } from '../../../events';
import { request } from '../../request';

interface PendingSettlementMap {
  [key: string]: SettlerMap;
}

const pendingSettlement = {} as PendingSettlementMap;

/**
 * @internal
 *
 * @param event
 * @param id
 */
const listen = <T extends object>(event: LampixEvents, data: object = null) => {
  const callbackName = eventToCallbackMap[event];
  const req = request(callbackName, data);

  pendingSettlement[event] = pendingSettlement[event] || {} as SettlerMap;
  let settler = pendingSettlement[event][req.requestId] = {} as Settler;

  const promise = new Promise<T>((resolve, reject) => {
    settler.resolve = resolve;
    settler.reject = reject;
  });

  // Settle the promise
  const unsubscribe = publisher.subscribe(event, (response: LampixResponse<T>) => {
    const { requestId, error, data } = response;

    if (req.requestId !== requestId) {
      return;
    }

    if (error) {
      settler.reject(error);
    } else {
      settler.resolve(data);
    }

    settler = null;
    delete pendingSettlement[event][requestId];
  });

  /**
   * Resolve and reject receive only one argument (by spec design)
   * And yes, I tried using .finally, but TypeScript is being peculiar about it,
   * es2018.promise or not
   *
   * @param data - Reject reason or a resolve value
   */
  const always = (data: any) => {
    unsubscribe();
    return data;
  };

  promise.then(always);
  promise.catch(always);

  return {
    promise,
    request: req
  };
};

export { listen };
