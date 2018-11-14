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
  let settler = pendingSettlement[event][req.request_id] = {} as Settler;

  const promise = new Promise<T>((resolve, reject) => {
    settler.resolve = resolve;
    settler.reject = reject;
  });

  // Settle the promise
  const unsubscribe = publisher.subscribe(event, (response: LampixResponse<T>) => {
    const { request_id, error, data } = response;

    if (req.request_id !== request_id) {
      return;
    }

    if (error) {
      settler.reject(error);
    } else {
      settler.resolve(data);
    }

    settler = null;
    delete pendingSettlement[event][request_id];
  });

  promise.then((data: any) => {
    unsubscribe();
    return data;
  });

  promise.catch((reason: any) => {
    unsubscribe();
    throw reason;
  });

  return {
    promise,
    request: req
  };
};

export { listen };
