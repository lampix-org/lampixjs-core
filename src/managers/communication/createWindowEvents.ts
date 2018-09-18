import noop from 'lodash/noop';
import isFunction from 'lodash/isFunction';
import invariant from 'invariant';

import { internalError } from '../../utils/messages/internalError';

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
  INTERNAL_SEGMENTER_EVENT
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
    publisher.publish(
      INTERNAL_SEGMENTER_EVENT,
      watcherId,
      classifiedObjects
    );
  };

  window.onObjectsLocated = (
    watcherId,
    detectedObjects
  ) => {
    invariant(
      isFunction(listeners.objectsLocatedCb),
      internalError('callbacks.objectsLocatedCb must be a function.')
    );

    listeners.objectsLocatedCb(watcherId, detectedObjects);
  };

  window.onLampixInfo = (lampixInfo: LampixInfo) => {
    invariant(
      isFunction(listeners.lampixInfoCb),
      internalError('callbacks.lampixInfoCb must be a function.')
    );

    listeners.lampixInfoCb(lampixInfo);
  };

  window.onGetApps = (apps: AppInfo[]) => {
    invariant(
      isFunction(listeners.getAppsCb),
      internalError('callbacks.getAppsCb must be a function.')
    );

    listeners.getAppsCb(apps);
  };

  window.onTransformCoordinates = (transformedRect: CoordinatesToTransform[]) => {
    invariant(
      isFunction(listeners.transformCoordinatesCb),
      internalError('callbacks.transformCoordinatesCb must be a function.')
    );

    listeners.transformCoordinatesCb(transformedRect);
  };
};

export { bindEvents };
