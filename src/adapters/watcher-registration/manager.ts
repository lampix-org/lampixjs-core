import {
  Manager
} from '../../types';

import { addWatchersInitializer } from './addWatchers';

const internalLampixAPI = window._lampix_internal;

const watchers: Manager.Watchers = {
  classifiers: [],
  segmenters: []
};

const addWatchers = addWatchersInitializer(internalLampixAPI, watchers);

export {
  addWatchers
};
