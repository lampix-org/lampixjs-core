# `.helpers.rectangle(x, y, width, height)`

Create a shape object for a watcher descriptor.

#### Returns

```js
{
  type: 'rectangle',
  data: {
    posX: number,
    posY: number,
    width: number,
    height: number
  }
}
```

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

const watcher = {
  name: 'NeuralNetworkClassifier',
  shape: lampix.helpers.rectangle(50, 50, 50, 50),
  onClassification: callback,
  params: {
    neural_network_name: 'fingers'
  }
};
```
