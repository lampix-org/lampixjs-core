import {
  Managers
} from '../../types';

import { addWatchersInitializer } from './addWatchers';
import { removeWatchersInitializer } from './removeWatchers';
import { watcherActionHandlerInitializer } from './watcherActionHandler';

import {
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT
} from '../../events';

const internalLampixAPI = window._lampix_internal;

const watchers: Managers.Watchers.Collection = {
  classifiers: {
    list: [],
    actionHandler: () => watcherActionHandlerInitializer(watchers.classifiers, INTERNAL_CLASSIFIER_EVENT)
  },
  segmenters: {
    list: [],
    actionHandler: () => watcherActionHandlerInitializer(watchers.segmenters, INTERNAL_SEGMENTER_EVENT)
  }
};

const addWatchers = addWatchersInitializer(internalLampixAPI, watchers);
const removeWatchers = removeWatchersInitializer(internalLampixAPI, watchers);

export {
  addWatchers,
  removeWatchers
};
