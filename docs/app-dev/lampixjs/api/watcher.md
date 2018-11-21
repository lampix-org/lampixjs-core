# `Watcher`

Watcher objects are plain object descriptors providing Lampix with the required information to start watching areas based on the behaviors described.

### Properties

* `name` (_string_): Literal string describing the Python class to instantiate and define the watcher's behavior (e.g `'NeuralNetworkClassifier'`, `'MovementBasedSegmenter'` etc.).
* `shape` (_Object_): Plain object with two properties, `type` and `shape` that defines the surface area for the watcher.
  * `type` (_string_): Defines shape type, and controls what the expected structure of `shape.data` will be. Accepted values:
    * `'rectangle'`
    * `'polygon'`
  * `data` (_Object_): Actual descriptor object for the contour of the watcher.
    * If `shape.type` is `'rectangle'`, the expected data structure is:
      * `posX` (_number_): top left X coordinate of rectangle
      * `posY` (_number_): top left Y coordinate of rectangle
      * `width` (_number_)
      * `height` (_number_)
    * If `shape.type` is `'polygon'`, a list of points is expected, with each point having the following data structure:
      * `x` (_number_): X coordinate of point
      * `y` (_number_): Y coordinate of point
* `onClassification` (_Function_): Callback used by Lampix to send information about recognized objects as a list with with recognized objects of the following structure:
  * `classTag` (_string_): Recognized class of the described object.
  * `objectId?` (_number, Optional_): ID representing the object. Useful when determining whether Lampix considers an object as new.
  * `outline?` (_Array<Point>, Optional_): Object with a property of `points` that describes the contour of the object as a polygon:
  * `metadata?` (_string_, Optional): Watcher specific information
* `onLocation` (_Function_): Callback used only by watchers that locate first, then classify. Called with a list of located objects that with a similar structure to the one above, except `classTag` is not mentioned since it has not been determined at the time of this call.
* `params?` (_Object_): Plain object with arbitrary props that can differ from watcher to watcher. See [standard watchers](../../standard-watchers.md)

### Notes

The only required property is `classTag`. Certain watchers that do not support more than one object at a time (e.g `NeuralNetworkClassifier`), will always provide a list with one recognized object that only has the `classTag` property. This is by design, to ensure consistency in the data format returned by the standard watchers.

### Example

```js
{
  name: 'DepthClassifier',
  shape: {
    type: "rectangle",
    data: {
      posX: 0,
      posY: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  params: {
    frames_until_stable: 5
  },
  onClassification: (objects) => draw(objects);
}
```

### Tips

In the example above, you can use `shape: lampix.helpers.rectangle(0, 0, window.innerWidth, window.innerHeight)` to achieve the same result.
