import noop from 'lodash/noop';

import {
  ClassifiedObject,
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

  window.onWatchersAdded = (response) => {
    publisher.publish(LampixEvents.WatchersAdded, response);
  };

  window.onWatchersRemoved = (response) => {
    publisher.publish(LampixEvents.WatchersRemoved, response);
  };

  window.onWatchersPaused = (response) => {
    publisher.publish(LampixEvents.WatchersPaused, response);
  };

  window.onWatchersResumed = (response) => {
    publisher.publish(LampixEvents.WatchersResumed, response);
  };

  window.onWatcherUpdated = (response) => {
    publisher.publish(LampixEvents.WatcherUpdated, response);
  };

  window.onLampixInfo = (response) => {
    publisher.publish(LampixEvents.LampixInfo, response);
  };

  window.onGetApps = (response) => {
    publisher.publish(LampixEvents.GetApps, response);
  };

  window.onTransformCoordinates = (response) => {
    publisher.publish(LampixEvents.TransformCoordinates, response);
  };

  window.onAppConfig = (config: object) => {
    publisher.publish(LampixEvents.AppConfig, {
      error: null,
      data: { config }
    });
  };

  window.onFileWritten = (response) => {
    publisher.publish(LampixEvents.FileWritten, response);
  };

  window.onFileRead = (response) => {
    publisher.publish(LampixEvents.FileRead, response);
  };
};

export { bindEvents };
