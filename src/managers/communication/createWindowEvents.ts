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
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT,
  WATCHER_REMOVED,
  WATCHER_ADDED,
  WATCHER_PAUSED,
  WATCHER_RESUMED,
  WATCHER_UPDATED,
  OBJECTS_LOCATED
} from '../../events';

/**
 * Creates the functions called by the Lampix backend.
 * These provide the main form of communication between Lampix and the running app.
 */
let bindEvents = () => {
  // Prevent multiple calls
  bindEvents = noop;

  window.onObjectClassified = (
    watcherId: WatcherID,
    recognizedClass: string,
    metadata: string
  ) => {
    publisher.publish(
      INTERNAL_CLASSIFIER_EVENT,
      watcherId,
      recognizedClass,
      metadata
    );
  };

  window.onObjectsDetected = (
    watcherId: WatcherID,
    classifiedObjects: ClassifiedObject[]
  ) => {
    publisher.publish(INTERNAL_SEGMENTER_EVENT, watcherId, classifiedObjects);
  };

  window.onObjectsLocated = (
    watcherId,
    locatedObjects
  ) => {
    publisher.publish(OBJECTS_LOCATED, watcherId, locatedObjects);
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
};

export { bindEvents };
