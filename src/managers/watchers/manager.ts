import {
  Managers
} from '../../types';

import { addWatchersInitializer } from './addWatchers';
import { removeWatchersInitializer } from './removeWatchers';

const internalLampixAPI = window._lampix_internal;

const watchers: Managers.Watchers.Collection = {
  classifiers: {
    list: [],
    actionHandler: () => {}
  },
  segmenters: {
    list: [],
    actionHandler: () => {}
  }
};

const addWatchers = addWatchersInitializer(internalLampixAPI, watchers);
const removeWatchers = removeWatchersInitializer(internalLampixAPI, watchers);

export {
  addWatchers,
  removeWatchers
};
