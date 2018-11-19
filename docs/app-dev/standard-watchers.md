# @lampix/core v1.x.x watcher names

- [NeuralNetworkClassifier](#neuralnetworkclassifier)
- [MovementBasedSegmenter](#movementbasedsegmenter)
- [DepthClassifier](#depthclassifier)

***

## NeuralNetworkClassifier

Uses a convolutional neural network to classify objects in the area watched by this classifier.  
The area is defined by the dimension of the neural network and the center of the bounding box of the contour registered from JS.

### Parameters

```js
{
  neural_network_classifier: string // required
}
```

### Usage:

```js
{
  type: 'classifier',
  name: 'NeuralNetworkClassifier',
  params: {
    neural_network_name: <some_NN_name> // e.g 'fin_all_small'
  }
}
```

***

## MovementBasedSegmenter

Like [NeuralNetworkClassifier](#neuralnetworkclassifier), MovementBasedSegmenter uses a convolutional neural network to classify objects.

MovementBasedSegmenter can detect (i.e locate and classify) multiple objects at a time in the specified watcher shape.

### Parameters

```js
{
  neural_network_classifier: string, // required

  // Accept only objects with contours whose circumscribed circle has a radius
  // between "min_radius" and "max_radius". In adition to that, the ratio between the contour
  // and the circumscribed circle must be larger than "min_area_ratio".

  filter_circle: {
    min_radius: integer,
    max_radius: integer,
    min_area_ratio: float // [0, 1] where 1 is a perfect circle
  },

  // Accept only object with contours whose circumscribed rectangle (bounding box)
  // has a ratio of the short/long sides between "min_ratio" and "max_ratio".

  filter_rect: {
    min_ratio: float, // (0, 1], the closer to 1, the more "square" the contour must be
    max_ratio: float, // same as above
  },

  // Threshold value which is used to determine if a pixel is different from the
  // table, therefore it is considered movement.
  // Values in range [1, 255). The higher the value, the more contrast there should be between
  // the table and the object.

  filter_tresh: int
}
```

### Usage:

```js
{
  type: 'segmenter',
  name: 'MovementBasedSegmenter',
  params: {
    ...
  }
}
```

***

## DepthClassifier

Detects any object on or above the surface defined by the watcher's shape, returning contour information.

### Usage:

```js
{
  type: 'segmenter',
  name: 'DepthClassifier',
  params: {
    frames_until_stable: int // currently experimental
  }
}
```
