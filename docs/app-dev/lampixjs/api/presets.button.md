# `.presets.button(x, y, callback, opts?)`

Create a watcher object prepared to be used as a button using the standard neural network and watcher name for finger recognition.

#### Returns

([`Watcher`](./watcher.md)): Plain object descriptor for a watcher ready to be registered.

#### Example

**NOTE** that all of the ways to create a button specified below are equivalent.

```js
import lampix from '@lampix/core';

const callback = ([recognizedObject]) => {
  if (Number(recognizedObject.classTag) === 1) {
    console.log('yay!');
  } else {
    console.log('nay!');
  }
};

// Showcasing how to do it the hard way first
const doingThingsTheHardWay = {
  name: 'NeuralNetworkClassifier',
  shape: {
    type: 'rectangle',
    data: {
      posX: 50,
      posY: 50,
      width: 50
      height: 50
    }
  },
  onClassification: callback,
  params: {
    neural_network_name: 'fingers'
  }
};

// And the easy way after
const doingThingsTheEasyWay = lampix.presets.button(50, 50, callback);

// Specifying width and height as well
const anotherEasyWatcher = lampix.presets.button(50, 50, callback, {
  width: 50,
  height: 50
});
```
