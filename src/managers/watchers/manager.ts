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
  WATCHER_REMOVED,
  WATCHER_ADDED
} from '../../events';

const internalLampixAPI = window._lampix_internal;

const wm = {} as Managers.Watchers.Manager;

wm.watchers = {};
wm.pendingAddition = {};
wm.pendingRemoval = {};
wm.addWatchers = addWatchersInitializer(internalLampixAPI, wm);
wm.removeWatchers = removeWatchersInitializer(internalLampixAPI, wm);

watcherActionHandler(wm, [
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT
]);

publisher.subscribe(WATCHER_REMOVED, (watcherId: WatcherID) => {
  const removalHandler = wm.pendingRemoval[watcherId];

  if (removalHandler) {
    removalHandler();
  }
});

publisher.subscribe(WATCHER_ADDED, (watcherId: WatcherID) => {
  const additionHandler = wm.pendingAddition[watcherId];

  if (additionHandler) {
    additionHandler();
  }
});

export { wm  as watcherManager };
