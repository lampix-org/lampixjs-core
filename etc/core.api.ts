// @public (undocumented)
class LampixBridge implements ILampixBridge {
  getLampixInfo(): Promise<LampixInfo>;
  // WARNING: The type "PublicAPI.WatcherRegistrar" needs to be exported by the package (e.g. added to index.ts)
  watchers: PublicAPI.WatcherRegistrar;
}

// @public
interface LampixInfo {
  id: string;
  isSimulator: boolean;
  version: string;
}

// @public (undocumented)
module PublicAPI {
  // @public (undocumented)
  interface Circle extends Watcher.Shape.Circle {
    // (undocumented)
    type: Watcher.Shape.Type.Circle;
  }

  // (undocumented)
  interface getLampixInfo {
    // (undocumented)
    (): Promise<LampixInfo>;
  }

  // @public (undocumented)
  interface Polygon extends Watcher.Shape.Polygon {
    // (undocumented)
    type: Watcher.Shape.Type.Polygon;
  }

  // @public (undocumented)
  interface Rectangle extends Watcher.Shape.Rectangle {
    // (undocumented)
    type: Watcher.Shape.Type.Rectangle;
  }

  // @public (undocumented)
  interface WatcherRegistrar {
    // WARNING: The type "Watcher.Watcher" needs to be exported by the package (e.g. added to index.ts)
    add(...watchers: Watcher.Watcher[]): Promise<RegisteredWatcher[]>;
    remove(...registeredWatchers: RegisteredWatcher[]): Promise<void>;
  }

}

// @public (undocumented)
interface RegisteredWatcher {
  // (undocumented)
  _id: string;
  active: boolean;
  pause(time: number): void;
  remove(): Promise<void>;
  resume(): void;
  // (undocumented)
  source: Watcher.Watcher;
}

// @public (undocumented)
module Watcher {
  // (undocumented)
  module Actions {
    // (undocumented)
    interface ClassifierAction {
      // (undocumented)
      (recognizedClass: string | number, metadata: string): void;
    }

    // (undocumented)
    interface SegmenterAction {
      // WARNING: The type "ClassifiedObject" needs to be exported by the package (e.g. added to index.ts)
      // (undocumented)
      (classifiedObjects: ClassifiedObject[]): void;
    }

  }

  // WARNING: Unsupported export: AllShapes
  // (undocumented)
  module Shape {
    // (undocumented)
    interface Circle {
      // (undocumented)
      cx: number;
      // (undocumented)
      cy: number;
      // (undocumented)
      r: number;
    }

    // (undocumented)
    interface Polygon {
      // (undocumented)
      outline: Coords2DPair[];
    }

    // (undocumented)
    interface Rectangle {
      // (undocumented)
      height: number;
      // (undocumented)
      posX: number;
      // (undocumented)
      posY: number;
      // (undocumented)
      width: number;
    }

    // (undocumented)
    enum Type {
      // (undocumented)
      Circle = "circle",
      // (undocumented)
      Polygon = "polygon",
      // (undocumented)
      Rectangle = "rectangle"
    }

  }

  // (undocumented)
  enum Types {
    // (undocumented)
    Classifier = "classifier",
    // (undocumented)
    Segmenter = "segmenter"
  }

  // @public (undocumented)
  interface Watcher extends ArbitraryProps {
    // (undocumented)
    action: Function;
    // (undocumented)
    name: string;
    // (undocumented)
    params?: ArbitraryProps;
    // (undocumented)
    shape: {
      data: Watcher.Shape.AllShapes;
      type: 'rectangle' | 'polygon' | 'circle';
    }
    // (undocumented)
    type: Watcher.Types;
  }

}

// WARNING: Unsupported export: api
// WARNING: Unsupported export: APP_SWITCHER_NAME
// WARNING: Unsupported export: WINDOW_WIDTH
// WARNING: Unsupported export: WINDOW_HEIGHT
// WARNING: Unsupported export: classifier
// WARNING: Unsupported export: segmenter
// WARNING: Unsupported export: circle
// WARNING: Unsupported export: rectangle
// WARNING: Unsupported export: polygon
// (No @packagedocumentation comment for this package)
