import invariant from 'invariant';
import isNumber from 'lodash/isNumber';
import noop from 'lodash/noop';

import {
  Watcher,
  RegisteredWatcher,
  RegisteredWatcherState,
  Managers,
  PublicAPI
} from '../../../types';

import { generateId } from '../../../utils/generateId';

/**
 * @param w - Actual data sent to Lampix device
 * @param wm - Abstracts away sending data to Lampix device
 * @internal
 */
export const createRegisteredWatcher = (w: Watcher.Watcher, wm: Managers.Watchers.Manager): RegisteredWatcher => {
  const state: RegisteredWatcherState = Object.defineProperties({}, {
    _id: {
      value: generateId(),
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
    state,
    source: w,
    onClassification: w.onClassification || noop,
    onLocation: w.onLocation || noop,
    resume() {
      if (state.active) {
        return Promise.resolve();
      }

      return wm.resumeWatchers([registeredWatcher]);
    },
    pause(time: number = 0) {
      invariant(isNumber(time) && time >= 0, 'pause() takes an optional positive number as milliseconds');

      if (time > 0) {
        setTimeout(registeredWatcher.resume, time);
      }

      if (!state.active) {
        return Promise.resolve();
      }

      return wm.pauseWatchers([registeredWatcher]);
    },
    remove: (): Promise<void> => wm.removeWatchers([registeredWatcher]).then(() => undefined),
    updateShape: (shape: PublicAPI.Shape) => wm.updateWatcherShape(state._id, shape).then(() => {
      if (shape.type === Watcher.Shape.Type.Rectangle) {
        registeredWatcher.source.shape = shape;
      }
    })
  };

  return registeredWatcher;
};
