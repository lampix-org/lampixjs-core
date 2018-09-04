import {
  Manager
} from '../../types';

import { addWatchersInitializer } from './addWatchers';
import { removeWatchersInitializer } from './removeWatchers';

const internalLampixAPI = window._lampix_internal;

const watchers: Manager.Watchers = {
  classifiers: [],
  segmenters: []
};

const addWatchers = addWatchersInitializer(internalLampixAPI, watchers);
const removeWatchers = removeWatchersInitializer(internalLampixAPI, watchers);

export {
  addWatchers,
  removeWatchers
};
