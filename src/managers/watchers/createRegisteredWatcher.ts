import invariant from 'invariant';
import isNumber from 'lodash/isNumber';

import {
  Watcher,
  RegisteredWatcher,
  RegisteredWatcherState
} from '../../types';

import { simpleId } from '../../utils/simpleId';

// TODO: wm should not be of type any down there

/**
 * @param w - Actual data sent to Lampix device
 * @param wm - Abstracts away sending data to Lampix device
 * @internal
 */
export const createRegisteredWatcher = (w: Watcher.Watcher, wm: any): RegisteredWatcher => {
  const state: RegisteredWatcherState = Object.defineProperties({}, {
    _id: {
      value: simpleId(),
      writable: false,
      configurable: false
    },
    active: {
      value: true,
      writable: true,
      configurable: false
    }
  });

  const registeredWatcher: RegisteredWatcher = {
    _id: state._id,
    source: w,
    active: state.active,
    resume() {
      // TODO: hook up with api.resume
      state.active = true;
    },
    pause(time: number = 0) {
      // TODO: hook up with api.pause
      invariant(isNumber(time) && time >= 0, 'pause() takes an optional positive number as milliseconds');

      if (time > 0) {
        setTimeout(registeredWatcher.resume, time);
      }

      state.active = false;
    },
    remove() {
      wm.removeWatchers(registeredWatcher);
    }
  };

  return registeredWatcher;
};
