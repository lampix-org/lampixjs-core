import {
  Managers,
  WatcherID
} from '../../types';

import { addWatchersInitializer } from './addWatchersInitializer';
import { removeWatchersInitializer } from './removeWatchersInitializer';
import { watcherActionHandler } from './watcherActionHandler';

import { publisher } from '../../publisher';

import {
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT,
  WATCHER_REMOVED
} from '../../events';

const internalLampixAPI = window._lampix_internal;

const wm: Managers.Watchers.Manager = {
  watchers: {},
  watcherRemovalHandlers: {}
};

watcherActionHandler(wm, [
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT
]);

publisher.subscribe(WATCHER_REMOVED, (watcherId: WatcherID) => {
  const removalHandler = wm.watcherRemovalHandlers[watcherId];

  if (removalHandler) {
    removalHandler();
  }

  delete wm.watcherRemovalHandlers[watcherId];
  delete wm.watchers[watcherId];
});

const addWatchers = addWatchersInitializer(internalLampixAPI, wm);
const removeWatchers = removeWatchersInitializer(internalLampixAPI, wm);

export {
  addWatchers,
  removeWatchers,
  wm as internals
};
