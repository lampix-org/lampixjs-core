export type Opts<T> = {
  [key: string]: T
};

export namespace InternalAPI {
  export interface RegisterFn { (rectArray: string): void; }
}

export type LampixInternal = {
  registerSimpleClassifier: RegisterFn;
  registerDrawingDetector: RegisterFn;
  registerPositionClassifier: RegisterFn;
  registerMovement: RegisterFn;
  isDepthClassifierActivated: boolean;
  getLampixInfo: () => void;
  activateDepthClassifier: (opts: Opts<string>) => void;
  deactivateDepthClassifier: () => void;
  playFullScreenVideo: (filename: string) => void;
  setIgnoredRects: (rectArrayJSON: string) => void;
  getApps: () => void;
  switchToApp: (appName: string) => void;
  transformCoordinates: (toTransform: string) => void;
};

declare global {
  interface Window {
    _lampix_internal: LampixInternal;
    onMovement: movementCallback;
    onSimpleClassifier: simpleClassifierCallback;
    onPositionClassifier: positionClassifierCallback;
    onPrePositionClassifier: prePositionClassifierCallback;
    onDrawingDetector: drawingDetectorCallback;
    onLampixInfo: lampixInfoCallback;
    onGetApps: getAppsCallback;
    onTransformCoordinates: transformCoordinatesCallback;
  }
}

export interface ArbitraryProps {
  [key: string]: any;
  [index: number]: any;
}

/**
 * @public
 */
export namespace Watcher {
  export enum Types {
    Classifier = 'classifier',
    Segmenter = 'segmenter'
  }

  export namespace Shape {
    export interface Rectangle {
      posX: number;
      posY: number;
      width: number;
      height: number;
    }

    export interface Polygon {
      [index: number]: number;
    }

    export interface Circle {
      cx: number;
      cy: number;
      r: number;
    }
  }

  export interface Watcher extends ArbitraryProps {
    shape: {
      type:
        'rectangle' |
        'polygon' |
        'circle';
      data:
        Watcher.Shape.Rectangle |
        Watcher.Shape.Polygon |
        Watcher.Shape.Circle;
    };
    type:
      Watcher.Types.Classifier |
      Watcher.Types.Segmenter;
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
export interface lampixInfoCallback {
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
 * Callback invoked when movement is detected.
 *
 * @param watcherIndex Index of the rectangle handling the movement event.
 * @param outlines Array of outlines detected in the rectangle. See {@link Outline}.
 */
export interface movementCallback {
  (watcherIndex: number, outlines: Outline[]): void;
}

/**
 * Callback invoked when an object is detected and classified.
 *
 * @param watcherIndex Index of the rectangle handling the classification event.
 * @param recognizedClass Class returned by the classifier.
 * @param metadata Field for extra information regarding classified objects.
 */
export interface simpleClassifierCallback {
  (watcherIndex: number, recognizedClass: string, metadata: string): void;
}

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
 * @param watcherIndex Index of the rectangle handling the classification event.
 * @param classifiedObjects Array of detected objects. See {@link ClassifiedObject}.
 */
export interface positionClassifierCallback {
  (watcherIndex: number, classifiedObjects: ClassifiedObject[]): void;
}

/**
 * Callback invoked when an object is detected, but before it is classified.
 *
 * @param watcherIndex Index of the rectangle handling the classification event.
 * @param detectedObjects Array of objects describing the shape of the detected objects.
 */
export interface prePositionClassifierCallback {
  (watcherIndex: number, detectedObjects: Outline[]): void;
}

export interface drawingDetectorCallback {
  (watcherIndex: number, objects: Outline[]): void;
}

export interface AppInfo {
  [name: string]: string;
}

export interface getAppsCallback {
  (apps: AppInfo[]): void;
}

/**
 * Callback invoked when converting camera coordinates to projector, or vice versa
 *
 * @param toTransform Object specifying the rectangle to transform and what direction the conversion should take
 */
export interface transformCoordinatesCallback {
  (transformedRect: CoordinatesToTransform[]): void;
}

export interface Callbacks {
  movementCb: movementCallback;
  simpleClassifierCb: simpleClassifierCallback;
  positionClassifierCb: positionClassifierCallback;
  prePositionClassifierCb: prePositionClassifierCallback;
  lampixInfoCb: lampixInfoCallback;
  drawingDetectorCb: drawingDetectorCallback;
  getAppsCb: getAppsCallback;
  transformCoordinatesCb: transformCoordinatesCallback;
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
  _id: string;
  source: Watcher.Watcher;
  remove(): void;
  /**
   * Makes the area inactive indefinitely or for a specified time
   * @param time - Time (in milliseconds) area should be inactive
   */
  pause(time: number): void;
  /**
   * Makes the area active
   */
  resume(): void;
  /**
   * Active status of the area
   */
  active: boolean;
}

/**
 * @public
 */
export namespace PublicAPI {
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
  /**
   * @public
   */
  export interface getLampixInfo { (): Promise<LampixInfo>; }
}

export interface ILampixBridge {
  getLampixInfo: PublicAPI.getLampixInfo;
}

export interface RegisterFn {
  (rectArray: string): void;
}

export namespace Managers {
  export namespace Watchers {
    export interface Manager {
      list: RegisteredWatcher[];
      actionHandler(index: number, ...data: any[]);
    }

    export interface Collection {
      classifiers: Managers.Watchers.Manager;
      segmenters: Managers.Watchers.Manager;
    }
  }
}
