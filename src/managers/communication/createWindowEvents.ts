import noop from 'lodash/noop';

import {
  LampixInfo,
  ClassifiedObject,
  AppInfo,
  CoordinatesToTransform,
  WatcherID
} from '../../types';

import { listeners } from './listeners';
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

/**
 * Creates the functions called by the Lampix backend.
 * These provide the main form of communication between Lampix and the running app.
 */
let bindEvents = () => {
  // Prevent multiple calls
  bindEvents = noop;

  window.onObjectsClassified = (
    watcherId: WatcherID,
    classifiedObjects: ClassifiedObject[]
  ) => {
    publisher.publish(CLASSIFICATION_EVENT, watcherId, classifiedObjects);
  };

  window.onObjectsLocated = (
    watcherId,
    locatedObjects
  ) => {
    publisher.publish(LOCATION_EVENT, watcherId, locatedObjects);
  };

  window.onWatcherRemoved = (watcherId: WatcherID) => {
    publisher.publish(WATCHER_REMOVED, watcherId);
  };

  window.onWatcherAdded = (watcherId: WatcherID) => {
    publisher.publish(WATCHER_ADDED, watcherId);
  };

  window.onWatcherPaused = (watcherId: WatcherID) => {
    publisher.publish(WATCHER_PAUSED, watcherId);
  };

  window.onWatcherResumed = (watcherId: WatcherID) => {
    publisher.publish(WATCHER_RESUMED, watcherId);
  };

  window.onWatcherUpdated = (watcherId: WatcherID) => {
    publisher.publish(WATCHER_UPDATED, watcherId);
  };

  window.onLampixInfo = (lampixInfo: LampixInfo) => {
    listeners.lampixInfoCb(lampixInfo);
  };

  window.onGetApps = (apps: AppInfo[]) => {
    listeners.getAppsCb(apps);
  };

  window.onTransformCoordinates = (transformedRect: CoordinatesToTransform[]) => {
    listeners.transformCoordinatesCb(transformedRect);
  };

  window.onAppConfig = (data: object) => {
    listeners.getAppConfigCb(data);
  };
};

export { bindEvents };
