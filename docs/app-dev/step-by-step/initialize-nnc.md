# Initialize NNC

Time to make `NeuralNetworkClassifier` watcher classify `fruits`.

Let's create an initialization function for the NNC watcher.

```js
const initializeNNC = () => {};
```

Retrieve the elements we'll be working with, along with the bounding rect of the element defining the watcher's contour.

```js
const initializeNNC = () => {
  // Get the elements we'll be working with...
  const nncElement = document.getElementsByClassName('nnc')[0];
  const nncRecognizedClassElement = document.getElementsByClassName('nnc-recognized-class')[0];

  // ...along with the bounding rect that defines the watcher size
  const nncBounds = nncElement.getBoundingClientRect();
};
```

Define the watcher data structure.

```js
  // ...

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
    }
  };
```

In case you're wondering, the above `lampix.helpers.rectangle` could be replaced with:

```js
{
  type: 'rectangle',
  data: {
    posX: nncBounds.left,
    posY: nncBounds.top,
    width: nncBounds.width,
    height: nncBounds.height
  }
}
```

The watcher data structure above is almost complete, but it's missing one key component: **what to actually do when classification is triggered**.

```js
  // ...

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
```

All that's left now is to inform Lampix of its existence, by adding the following to the end of the `initializeNNC` function.

```js
  // ...
  lampix.watchers.add(nncFruitsWatcher);
```

Now, `initializeNNC` should look like this:

```js
const initializeNNC = () => {
  // Get the elements we'll be working with...
  const nncElement = document.getElementsByClassName('nnc')[0];
  const nncRecognizedClassElement = document.getElementsByClassName('nnc-recognized-class')[0];

  // ...along with the bounding rect that defines the watcher size
  const nncBounds = nncElement.getBoundingClientRect();

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
```
