import invariant from 'invariant';
import isNumber from 'lodash/isNumber';

import {
  Watcher,
  RegisteredWatcher,
  RegisteredWatcherState
} from '../types';

import { simpleId } from '../utils/simpleId';
import * as watcherManager from '../adapters/watcher-registration/manager';

/**
 * @param r - Actual data sent to Lampix device
 * @param watcherManager - Abstracts away sending data to Lampix device
 * @internal
 */
export const createRegisteredWatcher = (w: Watcher.Watcher): RegisteredWatcher => {
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
    },
  });

  const registeredWatcher: RegisteredWatcher = {
    _id: state._id,
    source: w,
    active: state.active,
    resume() {
      state.active = true;
    },
    pause(time: number = 0) {
      invariant(isNumber(time) && time >= 0, 'pause() takes an optional positive number as milliseconds');

      if (time > 0) {
        setTimeout(registeredWatcher.resume, time);
      }

      state.active = false;
    },
    remove() {
      watcherManager.removeWatchers(registeredWatcher);
    }
  };

  return registeredWatcher;
};
