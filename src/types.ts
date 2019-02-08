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
  export interface RequestFn { (data: string): void; }
  export interface UpdateShape { (watcher_id: WatcherID, shape: string): void; }
  export interface SwitchToApp { (appName: string, queryParams?: string): void; }
}

export interface LampixResponse<T extends object> {
  /**
   * Request / response mapping ID
   */
  request_id: string;
  error: string;
  /**
   * Action specific data
   */
  data: T;
}

export namespace ResponsePayloads {
  export interface AppsPayload { apps: AppInfo[]; }
  export interface LampixInfoPayload { info: LampixInfo; }
  export interface FileReadPayload { data: object; }
  export interface FileWrittenPayload {}
  export interface SwitchToApp {}
  export interface WatchersAdded { watcher_ids: WatcherID[]; }
  export interface WatchersRemoved { watcher_ids: WatcherID[]; }
  export interface WatchersUpdated {}
  export interface WatchersPaused {}
  export interface WatchersResumed {}
  export interface RectCoordsTransformed { rectangles: RectCoords[]; }
}

export interface LampixRequest {
  /**
   * Request / response mapping ID
   */
  request_id: string;
  /**
   * window.* function to call for the response of a specific action
   */
  callback: string;
  /**
   * Stringified JSON with action specific data
   */
  data: string;
}

export type LampixInternal = {
  add_watchers: InternalAPI.RequestFn;
  remove_watchers: InternalAPI.RequestFn;
  pause_watchers: InternalAPI.RequestFn;
  resume_watchers: InternalAPI.RequestFn;
  update_watcher_shape: InternalAPI.RequestFn;
  switch_to_app: InternalAPI.RequestFn;
  get_lampix_info: InternalAPI.RequestFn;
  get_apps: InternalAPI.RequestFn;
  get_config_data: InternalAPI.RequestFn;
  write_file: InternalAPI.RequestFn,
  read_file: InternalAPI.RequestFn,
  transform_coordinates: InternalAPI.RequestFn
};

declare global {
  interface Window {
    _lampix_internal: LampixInternal;
    onObjectsClassified: ObjectsClassifiedCallback;
    onObjectsLocated: ObjectsLocatedCallback;
    onWatchersRemoved: WatchersRemovedCallback;
    onWatchersAdded: WatchersAddedCallback;
    onWatchersPaused: WatchersPausedCallback;
    onWatchersResumed: WatchersResumedCallback;
    onWatcherUpdated: WatcherUpdatedCallback;
    onLampixInfo: LampixInfoCallback;
    onGetApps: GetAppsCallback;
    onTransformCoordinates: TransformCoordsCallback;
    onAppConfig: AppConfigCallback;
    onFileWritten: FileWrittenCallback;
    onFileRead: FileReadCallback;
  }
}

/**
 * @public
 */
export namespace Watcher {
  export enum Names {
    NNClassifier = 'NeuralNetworkClassifier',
    NNSegmenter = 'NeuralNetworkSegmenter',
    DepthClassifier = 'DepthClassifier'
  }

  export interface onClassificationCallback {
    (classifiedObjects: ClassifiedObject[]): void;
  }

  export namespace Shape {
    export enum Type {
      Polygon = 'polygon',
      Rectangle = 'rectangle'
    }

    export interface Rectangle {
      posX: number;
      posY: number;
      width: number;
      height: number;
    }

    export interface Polygon extends Array<Coords2DPair>{}

    export type AllShapes =
      Watcher.Shape.Rectangle |
      Watcher.Shape.Polygon;
  }

  /**
   * @public
   */
  export interface Watcher extends ArbitraryProps {
    shape: {
      type: Watcher.Shape.Type.Rectangle | Watcher.Shape.Type.Polygon;
      data: Watcher.Shape.AllShapes;
    };
    name: string;
    params?: ArbitraryProps;
    onClassification: Function;
    onLocation?: Function;
  }
}

export interface RectCoords extends Watcher.Shape.Rectangle {
  coordinatesType: 'camera' | 'projector';
}

/**
 * Object providing information about the Lampix environment
 *
 * @public
 */
export interface LampixInfo {
  /** Lampix unique ID. */
  id: string;
  /** Lampix OS version. */
  version: string;
  /** True if the application is run within a simulator. */
  isSimulator: boolean;
}

/**
 * Callback invoked when Lampix information is available.
 *
 * @param lampixInfo Object containing Lampix information. See {@link LampixInfo}.
 */
export interface LampixInfoCallback {
  (r: ResponsePayloads.LampixInfoPayload): void;
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
 * @public
 */
export interface ClassifiedObject {
  /** Used to track same object over multiple frames. */
  objectId?: string;
  /** Class returned by classifier. */
  classTag: string;
  outline?: Outline;
  metadata?: any;
}

/**
 * Callback invoked when an object is detected and classified.
 *
 * @param watcherID Index of the rectangle handling the classification event.
 * @param classifiedObjects Array of detected objects. See {@link ClassifiedObject}.
 */
export interface ObjectsClassifiedCallback {
  (watcher_id: WatcherID, classifiedObjects: ClassifiedObject[]): void;
}

/**
 * Callback invoked when an object is detected, but before it is classified.
 *
 * @param watcher_id Index of the rectangle handling the classification event.
 * @param detectedObjects Array of objects describing the shape of the detected objects.
 */
export interface ObjectsLocatedCallback {
  (watcher_id: WatcherID, detectedObjects: Outline[]): void;
}

export interface AppInfo {
  name: string;
  package_data: object;
}

export interface GetAppsCallback {
  (r: LampixResponse<ResponsePayloads.AppsPayload>): void;
}

export interface WatchersAddedCallback {
  (r: LampixResponse<ResponsePayloads.WatchersAdded>): void;
}

export interface WatchersRemovedCallback {
  (r: LampixResponse<ResponsePayloads.WatchersRemoved>): void;
}

export interface WatcherUpdatedCallback {
  (r: LampixResponse<ResponsePayloads.WatchersUpdated>): void;
}

export interface WatchersPausedCallback {
  (r: LampixResponse<ResponsePayloads.WatchersPaused>): void;
}

export interface WatchersResumedCallback {
  (r: LampixResponse<ResponsePayloads.WatchersResumed>): void;
}

export interface FileWrittenCallback {
  (r: LampixResponse<ResponsePayloads.FileWrittenPayload>): void;
}

export interface FileReadCallback {
  (r: LampixResponse<ResponsePayloads.FileReadPayload>): void;
}

/**
 * Callback invoked when converting camera coordinates to projector, or vice versa
 *
 * @param toTransform Object specifying the rectangle to transform and what direction the conversion should take
 */
export interface TransformCoordsCallback {
  (r: LampixResponse<ResponsePayloads.RectCoordsTransformed>): void;
}

export interface AppConfigCallback {
  (appConfig: object): void;
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
  updateShape(shape: PublicAPI.Shape): Promise<void>;
  onClassification: Function;
  onLocation?: Function;
  /**
   * UI Related logic, should there be a need to associate visual components with a watcher directly
   */
  ui?: any;
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

  export interface Shape {
    type: Watcher.Shape.Type;
    data: Watcher.Shape.AllShapes;
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
    pauseAll(): Promise<void>;
    resumeAll(): Promise<void>;
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
    export interface WatcherPendingMap {
      [watcher_id: string]: Function;
    }

    export interface Manager {
      watchers: { [watcher_id: string]: RegisteredWatcher; };
      pendingRemoval: WatcherPendingMap;
      pendingAddition: WatcherPendingMap;
      pendingPausing: WatcherPendingMap;
      pendingResuming: WatcherPendingMap;
      pendingUpdate: WatcherPendingMap;
      addWatchers(watchers: Watcher.Watcher[]): Promise<RegisteredWatcher[]>;
      removeWatchers(watchers: RegisteredWatcher[]): Promise<void>;
      pauseWatchers(watchers: RegisteredWatcher[]): Promise<void>;
      pauseAllWatchers(): Promise<void>;
      resumeWatchers(watchers: RegisteredWatcher[]): Promise<void>;
      resumeAllWatchers(): Promise<void>;
      updateWatcherShape(watcher_id: WatcherID, shape: PublicAPI.Shape): Promise<void>;
    }
  }
}

export enum StandardNeuralNetworks {
  Fingers = 'fingers'
}

export interface SettlerMap {
  [key: string]: Settler;
}

export interface Settler {
  resolve: Function;
  reject: Function;
}

export interface QueryParamsObject {
  [key: string]: string;
}

export interface ButtonPreset {
  (
    x: number,
    y: number,
    onClassification: Function,
    opts?: { width: number, height: number }
  ): Watcher.Watcher;
}
