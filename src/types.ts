export type Rect = {
  /** X coordinate of the rectangle's top left corner. */
  posX: number,
  /** Y coordinate of the rectangle's top left corner. */
  posY: number,
  width: number,
  height: number
};

export type ClassifierRect = {
  /** X coordinate of the rectangle's top left corner. */
  posX: number,
  /** Y coordinate of the rectangle's top left corner. */
  posY: number,
  width: number,
  height: number,
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
 * Callback to be invoked when Lampix information is available.
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
 * Callback to be invoked when movement is detected.
 *
 * @param rectIndex Index of the rectangle handling the movement event.
 * @param outlines Array of outlines detected in the rectangle. See {@link Outline}.
 */
export type movementCallback = (rectIndex: number, outlines: Outline[]) => void;

/**
 * Callback to be invoked when an object is detected an classified.
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
 * Callback to be invoked when an object is detected an classified.
 *
 * @param rectIndex Index of the rectangle handling the classification event.
 * @param detectedObjects Array of detected objects. See {@link ClassifiedObject}.
 */
export type positionClassifierCallback = (rectIndex: number, detectedObjects: ClassifiedObject[]) => void;
