import {
  Managers,
  WatcherID
} from '../../types';

import { addWatchersInitializer } from './addWatchersInitializer';
import { removeWatchersInitializer } from './removeWatchersInitializer';
import { pauseWatchersInitializer } from './pauseWatchersInitializer';
import { resumeWatchersInitializer } from './resumeWatchersInitializer';
import { updateWatcherShapeInitializer } from './updateWatcherShapeInitializer';
import { watcherActionHandler } from './watcherActionHandler';

import { publisher } from '../../publisher';

import {
  CLASSIFICATION_EVENT,
  LOCATION_EVENT,
  WATCHER_REMOVED,
  WATCHER_ADDED,
  WATCHER_PAUSED,
  WATCHER_RESUMED,
  WATCHER_UPDATED
} from '../../events';

const wm = {} as Managers.Watchers.Manager;

wm.watchers = {};
wm.pendingAddition = {};
wm.pendingRemoval = {};
wm.pendingPausing = {};
wm.pendingResuming = {};
wm.pendingUpdate = {};
wm.addWatchers = addWatchersInitializer(wm);
wm.removeWatchers = removeWatchersInitializer(wm);
wm.pauseWatchers = pauseWatchersInitializer(wm);
wm.resumeWatchers = resumeWatchersInitializer(wm);
wm.updateWatcherShape = updateWatcherShapeInitializer(wm);

const getWatchers = () => Object.keys(wm.watchers).map((id) => wm.watchers[id]);
wm.pauseAllWatchers = () => wm.pauseWatchers(getWatchers());
wm.resumeAllWatchers = () => wm.resumeWatchers(getWatchers());

watcherActionHandler('onClassification', wm, CLASSIFICATION_EVENT);
watcherActionHandler('onLocation', wm, LOCATION_EVENT);

[
  { event: WATCHER_REMOVED, map: wm.pendingRemoval },
  { event: WATCHER_ADDED, map: wm.pendingAddition },
  { event: WATCHER_PAUSED, map: wm.pendingPausing },
  { event: WATCHER_RESUMED, map: wm.pendingResuming },
  { event: WATCHER_UPDATED, map: wm.pendingUpdate }
].forEach(({ event, map }) => {
  publisher.subscribe(event, (watcherId: WatcherID) => map[watcherId] && map[watcherId]());
});

export { wm  as watcherManager };
