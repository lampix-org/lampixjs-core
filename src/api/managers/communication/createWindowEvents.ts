import noop from 'lodash/noop';

import {
  LampixInfo,
  ClassifiedObject,
  AppInfo,
  CoordinatesToTransform,
  WatcherID
} from '../../../types';

import { publisher } from '../../../publisher';
import { LampixEvents } from '../../../events';

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
    publisher.publish(LampixEvents.Classification, {
      error: null,
      data: { watcherId, classifiedObjects }
    });
  };

  window.onObjectsLocated = (
    watcherId,
    locatedObjects
  ) => {
    publisher.publish(LampixEvents.Location, {
      error: null,
      data: { watcherId, locatedObjects }
    });
  };

  window.onWatcherRemoved = (watcherId: WatcherID) => {
    publisher.publish(LampixEvents.WatcherRemoved, {
      error: null,
      data: { watcherId }
    });
  };

  window.onWatcherAdded = (watcherId: WatcherID) => {
    publisher.publish(LampixEvents.WatcherAdded, {
      error: null,
      data: { watcherId }
    });
  };

  window.onWatcherPaused = (watcherId: WatcherID) => {
    publisher.publish(LampixEvents.WatcherPaused, {
      error: null,
      data: { watcherId }
    });
  };

  window.onWatcherResumed = (watcherId: WatcherID) => {
    publisher.publish(LampixEvents.WatcherResumed, {
      error: null,
      data: { watcherId }
    });
  };

  window.onWatcherUpdated = (watcherId: WatcherID) => {
    publisher.publish(LampixEvents.WatcherUpdated, {
      error: null,
      data: { watcherId }
    });
  };

  window.onLampixInfo = (lampixInfo: LampixInfo) => {
    publisher.publish(LampixEvents.LampixInfo, {
      error: null,
      data: { lampixInfo }
    });
  };

  window.onGetApps = (apps: AppInfo[]) => {
    publisher.publish(LampixEvents.GetApps, {
      error: null,
      data: { apps }
    });
  };

  window.onTransformCoordinates = (transformedRect: CoordinatesToTransform[]) => {
    publisher.publish(LampixEvents.TransformCoordinates, transformedRect);
  };

  window.onAppConfig = (data: object) => {
    publisher.publish(LampixEvents.AppConfig, data);
  };
};

export { bindEvents };