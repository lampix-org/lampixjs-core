export type LampixInternal = {
  getLampixInfo: () => void;
  registerMovement: (rectArrayJSON: string) => void;
  registerSimpleClassifier: (classRectArrayJSON: string) => void;
  registerDrawingDetector: (classRectArrayJSON: string) => void;
  playFullScreenVideo: (filename: string) => void;
  registerPositionClassifier: (classRectArrayJSON: string) => void;
  setIgnoredRects: (rectArrayJSON: string) => void;
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
  }
}

export type Rect = {
  /** X coordinate of the rectangle's top left corner. */
  posX: number,
  /** Y coordinate of the rectangle's top left corner. */
  posY: number,
  width: number,
  height: number
};

export type ClassifierRect = Rect & {
  /** Classifier to run inside the rectangle. */
  classifier: string
};

export type LampixInfo = {
  /** Lampix unique hardware ID. */
  id: string,
  /** Lampix OS version. */
  version: string,
  /** True if the application is run within a simulator. */
  isSimulator: boolean
};

/**
 * Callback invoked when Lampix information is available.
 *
 * @param lampixInfo Object containing relevant Lampix information. See {@link LampixInfo}.
 */
export type lampixInfoCallback = (lampixInfo: LampixInfo) => void;

export type Point = {
  posX: number,
  posY: number
};

export type Outline = {
  /** Array of points that define the outline. See {@link Point}. */
  points: Point[]
};

/**
 * Callback invoked when movement is detected.
 *
 * @param rectIndex Index of the rectangle handling the movement event.
 * @param outlines Array of outlines detected in the rectangle. See {@link Outline}.
 */
export type movementCallback = (rectIndex: number, outlines: Outline[]) => void;

/**
 * Callback invoked when an object is detected an classified.
 *
 * @param rectIndex Index of the rectangle handling the classification event.
 * @param classTag Class returned by the classifier.
 */
export type simpleClassifierCallback = (rectIndex: number, classTag: string) => void;

export type ClassifiedObject = {
  /** Used to track same object over multiple frames. */
  objectId: string,
  /** Class returned by classifier. */
  classTag: string,
  outline: Outline
};

/**
 * Callback invoked when an object is detected and classified.
 *
 * @param rectIndex Index of the rectangle handling the classification event.
 * @param classifiedObjects Array of detected objects. See {@link ClassifiedObject}.
 */
export type positionClassifierCallback = (rectIndex: number, classifiedObjects: ClassifiedObject[]) => void;

/**
 * Callback invoked when an object is detected, but before it is classified.
 *
 * @param rectIndex Index of the rectangle handling the classification event.
 * @param detectedObjects Array of objects describing the shape of the detected objects
 */
export type prePositionClassifierCallback = (rectIndex: number, detectedObjects: any[]) => void;

export type drawingDetectorCallback = (rectIndex: number, objects: any[]) => void;


export type Callbacks = {
  movementCallback: movementCallback,
  simpleClassifierCallback: simpleClassifierCallback,
  positionClassifierCallback: positionClassifierCallback,
  prePositionClassifierCallback: prePositionClassifierCallback,
  lampixInfoCallback: lampixInfoCallback,
  drawingDetectorCallback: drawingDetectorCallback
};

export type Cache = {
  lampixInfo: LampixInfo
};
