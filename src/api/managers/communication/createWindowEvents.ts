import noop from 'lodash/noop';

import {
  LampixInfo,
  ClassifiedObject,
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
      data: { watcherId, objects: classifiedObjects }
    });
  };

  window.onObjectsLocated = (
    watcherId,
    locatedObjects
  ) => {
    publisher.publish(LampixEvents.Location, {
      error: null,
      data: { watcherId, objects: locatedObjects }
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

  window.onGetApps = (response) => {
    publisher.publish(LampixEvents.GetApps, response);
  };

  window.onTransformCoordinates = (transformedRect: CoordinatesToTransform[]) => {
    publisher.publish(LampixEvents.TransformCoordinates, {
      error: null,
      data: { transformedRect }
    });
  };

  window.onAppConfig = (config: object) => {
    publisher.publish(LampixEvents.AppConfig, {
      error: null,
      data: { config }
    });
  };

  window.onFileWritten = (error: string, filename: string) => {
    publisher.publish(LampixEvents.FileWritten, {
      error,
      data: { filename }
    });
  };

  window.onFileRead = (error: string, filename: string, data: object) => {
    publisher.publish(LampixEvents.FileRead, {
      error,
      data: { filename, data }
    });
  };
};

export { bindEvents };
