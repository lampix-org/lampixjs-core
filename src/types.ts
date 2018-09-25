export type Opts<T> = {
  [key: string]: T
};

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type WatcherID = string;
export type Coords2DPair = { x: number, y: number };

export interface ArbitraryProps {
  [key: string]: any;
  [index: number]: any;
}

export interface NoOp {
  (): void;
}

export namespace InternalAPI {
  export interface RegisterFn { (rectArray: string): void; }
}

export type LampixInternal = {
  add_watchers: InternalAPI.RegisterFn;
  remove_watchers: InternalAPI.RegisterFn;
  pause_watchers: InternalAPI.RegisterFn;
  resume_watchers: InternalAPI.RegisterFn;
  getLampixInfo: NoOp;
  getApps: NoOp;
  resume: NoOp;
  pause: NoOp;
  deactivateDepthClassifier: NoOp;
  isDepthClassifierActivated: boolean;
  activateDepthClassifier: (opts: Opts<string>) => void;
  switchToApp: (appName: string) => void;
  transformCoordinates: (toTransform: string) => void;
};

declare global {
  interface Window {
    _lampix_internal: LampixInternal;
    onObjectClassified: ObjectClassifiedCallback;
    onObjectsDetected: ObjectsDetectedCallback;
    onObjectsLocated: ObjectsLocatedCallback;
    onLampixInfo: LampixInfoCallback;
    onGetApps: GetAppsCallback;
    onTransformCoordinates: TransformCoordsCallback;
    onWatcherRemoved: WatcherRequestCompleteCallback;
    onWatcherAdded: WatcherRequestCompleteCallback;
    onWatcherPaused: WatcherRequestCompleteCallback;
    onWatcherResumed: WatcherRequestCompleteCallback;
  }
}

/**
 * @public
 */
export namespace Watcher {
  export enum Types {
    Classifier = 'classifier',
    Segmenter = 'segmenter'
  }

  export namespace Actions {
    export interface ClassifierAction {
      (recognizedClass: string | number, metadata: string): void;
    }

    export interface SegmenterAction {
      (classifiedObjects: ClassifiedObject[]): void;
    }
  }

  export namespace Shape {
    export enum Type {
      Polygon = 'polygon',
      Rectangle = 'rectangle',
      Circle = 'circle'
    }

    export interface Rectangle {
      posX: number;
      posY: number;
      width: number;
      height: number;
    }

    export interface Polygon extends Array<Coords2DPair>{}

    export interface Circle {
      cx: number;
      cy: number;
      r: number;
    }

    export type AllShapes =
      Watcher.Shape.Rectangle |
      Watcher.Shape.Polygon |
      Watcher.Shape.Circle;
  }

  /**
   * @public
   */
  export interface Watcher extends ArbitraryProps {
    shape: {
      type:
        'rectangle' |
        'polygon' |
        'circle';
      data: Watcher.Shape.AllShapes;
    };
    type: Watcher.Types;
    name: string;
    params?: ArbitraryProps;
    action: Function;
  }
}

export interface CoordinatesToTransform extends Watcher.Shape.Rectangle {
  coordinatesType: 'camera' | 'projector';
}

/**
 * Object providing information about the Lampix environment
 *
 * @public
 */
export interface LampixInfo {
  /** Lampix unique hardware ID. */
  id: string;
  /** Lampix OS version. */
  version: string;
  /** True if the application is run within a simulator. */
  isSimulator: boolean;
}

/**
 * Callback invoked when Lampix information is available.
 *
 * @param lampixInfo Object containing relevant Lampix information. See {@link LampixInfo}.
 */
export interface LampixInfoCallback {
  (lampixInfo: LampixInfo): void;
}

export interface Point {
  posX: number;
  posY: number;
}

export interface Outline {
  /** Array of points that define the outline. See {@link Point}. */
  points: Point[];
}

/**
 * Callback invoked when an object is detected and classified.
 *
 * @param watcherId Index of the rectangle handling the classification event.
 * @param recognizedClass Class returned by the classifier.
 * @param metadata Field for extra information regarding classified objects.
 */
export interface ObjectClassifiedCallback {
  (watcherId: WatcherID, recognizedClass: string, metadata: string): void;
}

/**
 * @public
 */
export interface ClassifiedObject {
  /** Used to track same object over multiple frames. */
  objectId: string;
  /** Class returned by classifier. */
  recognizedClass: string;
  outline: Outline;
  metadata?: any;
}

/**
 * Callback invoked when an object is detected and classified.
 *
 * @param watcherID Index of the rectangle handling the classification event.
 * @param classifiedObjects Array of detected objects. See {@link ClassifiedObject}.
 */
export interface ObjectsDetectedCallback {
  (watcherId: WatcherID, classifiedObjects: ClassifiedObject[]): void;
}

/**
 * Callback invoked when an object is detected, but before it is classified.
 *
 * @param watcherId Index of the rectangle handling the classification event.
 * @param detectedObjects Array of objects describing the shape of the detected objects.
 */
export interface ObjectsLocatedCallback {
  (watcherId: WatcherID, detectedObjects: Outline[]): void;
}

export interface AppInfo {
  [name: string]: string;
}

export interface GetAppsCallback {
  (apps: AppInfo[]): void;
}

/**
 * Callback invoked when converting camera coordinates to projector, or vice versa
 *
 * @param toTransform Object specifying the rectangle to transform and what direction the conversion should take
 */
export interface TransformCoordsCallback {
  (transformedRect: CoordinatesToTransform[]): void;
}

export interface WatcherRequestCompleteCallback {
  (watcherId: WatcherID): void;
}

export interface Callbacks {
  objectClassifiedCb: ObjectClassifiedCallback;
  objectsDetectedCb: ObjectsDetectedCallback;
  objectsLocatedCb: ObjectsLocatedCallback;
  lampixInfoCb: LampixInfoCallback;
  getAppsCb: GetAppsCallback;
  transformCoordinatesCb: TransformCoordsCallback;
}

export interface PublisherEventListeners {
  [functionId: string]: Function;
}

export interface PublisherTopicContent {
  listeners: PublisherEventListeners;
  queue: string[];
}

export interface PublisherTopics {
  [topic: string]: PublisherTopicContent;
}

export interface RegisteredWatcherState {
  _id: string;
  active: boolean;
}

/**
 * @public
 */
export interface RegisteredWatcher {
  state: {
    _id: string,
    active: boolean
  };
  source: Watcher.Watcher;
  /**
   *  Removes area from list of watched areas.
   *  This clears all resources related to this watcher on the device.
   *  If you aim to reuse the area shortly after disabling it,
   *  consider using {@link RegisteredWatcher.pause | pause} instead.
   */
  remove(): Promise<void>;
  /**
   * Makes the area inactive indefinitely or for a specified time
   * @param time - Time (in milliseconds) area should be inactive
   */
  pause(time: number): void;
  /**
   * Makes the area active
   */
  resume(): void;
  action: Function;
}

/**
 * @public
 */
export namespace PublicAPI {
  /**
   * @public
   */
  export interface Rectangle {
    type: Watcher.Shape.Type.Rectangle;
    data: Watcher.Shape.Rectangle;
  }

  /**
   * @public
   */
  export interface Polygon {
    type: Watcher.Shape.Type.Polygon;
    data: Watcher.Shape.Polygon;
  }

  /**
   * @public
   */
  export interface Circle {
    type: Watcher.Shape.Type.Circle;
    data: Watcher.Shape.Circle;
  }

  /**
   * @public
   */
  export interface WatcherRegistrar {
    /**
     * Add one or more comma separated watchers
     * @param watchers - List of {@link Watcher.Watcher} objects to register
     */
    add(...watchers: Watcher.Watcher[]): Promise<RegisteredWatcher[]>;
    /**
     * Remove one or more comma separated registered watchers
     * @param registeredWatchers - List of {@link RegisteredWatcher} objects to remove
     */
    remove(...registeredWatchers: RegisteredWatcher[]): Promise<void>;
  }

  export interface getLampixInfo { (): Promise<LampixInfo>; }
}

export interface ILampixBridge {
  getLampixInfo: PublicAPI.getLampixInfo;
}

export interface RegisterFn {
  (watchersJSON: string): void;
}

export namespace Managers {
  export namespace Watchers {
    export interface Manager {
      watchers: { [watcherId: string]: RegisteredWatcher; };
      pendingRemoval: { [watcherId: string]: Function };
      pendingAddition: { [watcherId: string]: Function };
      pendingPausing: { [watcherId: string]: Function };
      pendingResuming: { [watcherId: string]: Function };
      addWatchers(watchers: Watcher.Watcher[]): Promise<RegisteredWatcher[]>;
      removeWatchers(watchers: RegisteredWatcher[]): Promise<void>;
      pauseWatchers(watchers: RegisteredWatcher[]): Promise<void>;
      resumeWatchers(watchers: RegisteredWatcher[]): Promise<void>;
    }
  }
}
