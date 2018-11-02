import {
  Managers
} from '../../../types';

import { addWatchersInitializer } from './addWatchersInitializer';
import { removeWatchersInitializer } from './removeWatchersInitializer';
import { pauseWatchersInitializer } from './pauseWatchersInitializer';
import { resumeWatchersInitializer } from './resumeWatchersInitializer';
import { updateWatcherShapeInitializer } from './updateWatcherShapeInitializer';
import { watcherActionHandler } from './watcherActionHandler';

import { LampixEvents } from '../../../events';

const wm = {} as Managers.Watchers.Manager;

wm.watchers = {};
wm.pendingAddition = {};
wm.pendingRemoval = {};
wm.pendingPausing = {};
wm.pendingResuming = {};
wm.pendingUpdate = {};
wm.addWatchers = addWatchersInitializer(wm);
wm.removeWatchers = removeWatchersInitializer(wm);
wm.pauseWatchers = pauseWatchersInitializer();
wm.resumeWatchers = resumeWatchersInitializer();
wm.updateWatcherShape = updateWatcherShapeInitializer();

const getWatchers = () => Object.keys(wm.watchers).map((id) => wm.watchers[id]);
wm.pauseAllWatchers = () => wm.pauseWatchers(getWatchers());
wm.resumeAllWatchers = () => wm.resumeWatchers(getWatchers());

watcherActionHandler('onClassification', wm, LampixEvents.Classification);
watcherActionHandler('onLocation', wm, LampixEvents.Location);

export { wm  as watcherManager };
