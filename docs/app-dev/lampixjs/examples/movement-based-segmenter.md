# Movement Based Segmenter

`MovementBasedSegmenter` uses a convolutional neural network to classify objects.
`MovementBasedSegmenter` can detect (i.e locate and classify) multiple objects at a time in the specified watcher shape.

Example usage:

```js
import lampix from '@lampix/core';

const watcher = {
  name: 'MovementBasedSegmenter',
  shape: {
    type: 'rectangle',
    data: {
      posX: 0,
      posY: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  params: {
    neural_network_name: 'fruits',
    filter_circle: { min_radius: 50, max_radius: 150, min_area_ratio: 0.7 },
    filter_area: { min_ratio: 3000, max_ratio: 70000 },
    filter_thresh: 55
  }
}

// Remember: .watchers.add always returns an array of registered watchers
// of the same length as the number of arguments passed to it
lampix.watchers.add(watcher)
  .then((listOfWatchers) => console.log(listOfWatchers[0]));
```

See [standard watchers](../../standard-watchers.md) for more information MBS.
