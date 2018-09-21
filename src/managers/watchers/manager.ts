import {
  Managers,
  WatcherID
} from '../../types';

import { addWatchersInitializer } from './addWatchersInitializer';
import { removeWatchersInitializer } from './removeWatchersInitializer';
import { pauseWatchersInitializer } from './pauseWatchersInitializer';
import { resumeWatchersInitializer } from './resumeWatchersInitializer';
import { watcherActionHandler } from './watcherActionHandler';

import { publisher } from '../../publisher';

import {
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT,
  WATCHER_REMOVED,
  WATCHER_ADDED,
  WATCHER_PAUSED,
  WATCHER_RESUMED
} from '../../events';

const internalLampixAPI = window._lampix_internal;
const wm = {} as Managers.Watchers.Manager;

wm.watchers = {};
wm.pendingAddition = {};
wm.pendingRemoval = {};
wm.pendingPausing = {};
wm.pendingResuming = {};
wm.addWatchers = addWatchersInitializer(internalLampixAPI, wm);
wm.removeWatchers = removeWatchersInitializer(internalLampixAPI, wm);
wm.pauseWatchers = pauseWatchersInitializer(internalLampixAPI, wm);
wm.resumeWatchers = resumeWatchersInitializer(internalLampixAPI, wm);

watcherActionHandler(wm, [
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT
]);

[
  { event: WATCHER_REMOVED, map: wm.pendingRemoval },
  { event: WATCHER_ADDED, map: wm.pendingAddition },
  { event: WATCHER_PAUSED, map: wm.pendingPausing },
  { event: WATCHER_RESUMED, map: wm.pendingResuming }
].forEach(({ event, map }) => {
  publisher.subscribe(event, (watcherId: WatcherID) => map[watcherId] && map[watcherId]());
});

export { wm  as watcherManager };
