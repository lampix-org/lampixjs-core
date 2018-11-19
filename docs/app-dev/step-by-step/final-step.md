# Final step

All that's left to do is call the initializer functions at the bottom of `index.js`:

```js
initializeNNC();
initializeMBS();
```

The end result should look like: 


```js
import lampix from '@lampix/core';

import './styles.css';
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
      nncElement.style.borderColor = '#FF0000';
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

  const onClassification = (classifiedObjects) => classifiedObjects.forEach((classifiedObject) => {
    handleObjectClassified(classifiedObject, '#FFFFFF');
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

Minus the next, optional step, this is the exact application in [the fruits example on our GitHub](https://github.com/lampix-org/example-fruits).  
If you're having trouble with this guide, see if the source code can help you out.
