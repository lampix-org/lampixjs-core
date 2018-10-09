import invariant from 'invariant';
import isNumber from 'lodash/isNumber';
import noop from 'lodash/noop';

import {
  Watcher,
  RegisteredWatcher,
  RegisteredWatcherState,
  Managers,
  PublicAPI
} from '../../types';

import { simpleId } from '../../utils/simpleId';

/**
 * @param w - Actual data sent to Lampix device
 * @param wm - Abstracts away sending data to Lampix device
 * @internal
 */
export const createRegisteredWatcher = (w: Watcher.Watcher, wm: Managers.Watchers.Manager): RegisteredWatcher => {
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
    state,
    source: w,
    action: w.action || noop,
    resume() {
      if (state.active) {
        return Promise.resolve();
      }

      return wm.resumeWatchers([registeredWatcher]).then(() => {
        state.active = true;
      });
    },
    pause(time: number = 0) {
      // TODO: hook up with api.pause
      invariant(isNumber(time) && time >= 0, 'pause() takes an optional positive number as milliseconds');

      if (time > 0) {
        setTimeout(registeredWatcher.resume, time);
      }

      if (!state.active) {
        return Promise.resolve();
      }

      return wm.pauseWatchers([registeredWatcher]).then(() => {
        state.active = false;
      });
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
