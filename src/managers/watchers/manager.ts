import {
  Managers
} from '../../types';

import { addWatchersInitializer } from './addWatchersInitializer';
import { removeWatchersInitializer } from './removeWatchersInitializer';
import { watcherActionHandler } from './watcherActionHandler';

import {
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT
} from '../../events';

const internalLampixAPI = window._lampix_internal;

const wm: Managers.Watchers.Manager = {
  watchers: {}
};

watcherActionHandler(wm, [
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT
]);

const addWatchers = addWatchersInitializer(internalLampixAPI, wm);
const removeWatchers = removeWatchersInitializer(internalLampixAPI, wm);

export {
  addWatchers,
  removeWatchers
};
