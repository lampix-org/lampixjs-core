# Extras

## Random color

Use a utility function to generate a random color for the border of the NNC and the elements of the MBS.

```js
// randomColor.js
export default () => `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`;
```

Import it in `index.js`.

```js
// ...
import randomColor from './randomColor';
```

Use it for both NNC and MBS.

```js
  // ...
  nncElement.style.borderColor = randomColor();
  // ...
```

```js
  // ...
  // Associate one class to one color
  const classColorMap = {};

  const onClassification = (classifiedObjects) => classifiedObjects.forEach((classifiedObject) => {
    let color = classColorMap[classifiedObject.classTag];

    if (!color) {
      color = randomColor();
      classColorMap[classifiedObject.classTag] = color;
    }

    handleObjectClassified(classifiedObject, color);
  });
  // ...
```

End result:

```js
import lampix from '@lampix/core';

import './styles.css';
import randomColor from './randomColor';
import handleObjectClassified from './handleObjectClassified';

const initializeNNC = () => {
  const nncElement = document.getElementsByClassName('nnc')[0];
  const nncBounds = nncElement.getBoundingClientRect();
  const nncRecognizedClassElement = document.getElementsByClassName('nnc-recognized-class')[0];

  // All Lampix classifiers return a list of recognized objects
  // NNClassifier only recognizes one at a time, hence expecting
  // an array with one element and destructuring it
  const nncCallback = ([recognizedObject]) => {
    nncRecognizedClassElement.textContent = `Recognized: ${recognizedObject.classTag}`;

    if (Number(recognizedObject.classTag) === 1) {
      // Change border color on each new detection
      nncElement.style.borderColor = randomColor();
    } else {
      // Go back to white if object no longer there
      nncElement.style.borderColor = '#FFFFFF';
    }
  };

  const nncFruitsWatcher = {
    name: 'NeuralNetworkClassifier',
    shape: lampix.helpers.rectangle(
      nncBounds.left,
      nncBounds.top,
      nncBounds.width,
      nncBounds.height
    ),
    params: {
      neural_network_name: 'fruits'
    },
    onClassification: nncCallback
  };

  lampix.watchers.add(nncFruitsWatcher);
};

const initializeMBS = () => {
  const mbsElement = document.getElementsByClassName('mbs')[0];
  const mbsBounds = mbsElement.getBoundingClientRect();

  // Associate one class to one color
  const classColorMap = {};

  const onClassification = (classifiedObjects) => classifiedObjects.forEach((classifiedObject) => {
    let color = classColorMap[classifiedObject.classTag];

    if (!color) {
      color = randomColor();
      classColorMap[classifiedObject.classTag] = color;
    }

    handleObjectClassified(classifiedObject, color);
  });

  const onLocation = (locatedObjects) => {
    // This step fires before onClassification!
    console.log(locatedObjects);
  };

  const mbsFruitsWatcher = {
    name: 'MovementBasedSegmenter',
    shape: lampix.helpers.rectangle(
      mbsBounds.left,
      mbsBounds.top,
      mbsBounds.width,
      mbsBounds.height
    ),
    params: {
      neural_network_name: 'fruits'
    },
    onLocation,
    onClassification
  };

  lampix.watchers.add(mbsFruitsWatcher);
};

initializeNNC();
initializeMBS();
```
