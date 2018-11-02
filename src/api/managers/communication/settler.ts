import { Settler, SettlerMap, InternalAPI } from '../../../types';

import { publisher } from '../../../publisher';
import { LampixEvents } from '../../../events';
import { simpleId } from '../../../utils/simpleId';

interface PendingSettlementMap {
  [key: string]: SettlerMap;
}

const pendingSettlement = {} as PendingSettlementMap;

const listen = (event: LampixEvents, id: string = simpleId()) => {
  pendingSettlement[event] = pendingSettlement[event] || {} as SettlerMap;
  let settler = pendingSettlement[event][id] = {} as Settler;

  const promise = new Promise((resolve, reject) => {
    settler.resolve = resolve;
    settler.reject = reject;
  });

  // Settle the promise
  const unsubscribe = publisher.subscribe(event, ({ error, data }: InternalAPI.LampixResponse) => {
    if (error) {
      settler.reject(error);
    } else {
      settler.resolve(data);
    }

    settler = null;
    delete pendingSettlement[event][id];
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

  return promise;
};

export { listen };
