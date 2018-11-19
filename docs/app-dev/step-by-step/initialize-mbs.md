# Initialize MBS

`MovementBasedSegmenter`'s turn to locate and detect `fruits`.

Let's create an initialization function for the MBS watcher.

```js
const initializeMBS = () => {};
```

Once again, retrieve the elements we'll be working with, along with the bounding rect of the element defining the watcher's contour.

```js
const initializeMBS = () => {
  const mbsElement = document.getElementsByClassName('mbs')[0];
  const mbsBounds = mbsElement.getBoundingClientRect();
};
```

Just like `NeuralNetworkClassifier` (and all watchers, for that matter), **MBS** also has its classification trigger on the `onClassification` callback.  
However, `MovementBasedSegmenter` has a secondary callback, triggered prior to `onClassification`, named `onLocation`. This is because MBS first determines the location of an object and the it classifies it. `onLocation` is generally used to create a loading animation for a located, not yet classified object.

For the sake of simplicity, we will focus on `onClassification` in this guide.

```js
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
};
```

Let's also add the utility mentioned above to add DOM elements for each classified object (remember to import it):

```js
// handleObjectClassified.js
const handleObjectClassified = (obj, color) => {
  const el = document.createElement('div');
  el.classList.add('mbs-object');
  el.style.borderColor = color;
  el.style.left = `${obj.centerPoint.posX - 25}px`;
  el.style.top = `${obj.centerPoint.posY - 25}px`;
  el.textContent = obj.classTag;

  document.body.appendChild(el);
};

export default handleObjectClassified;
```

All that's left is telling Lampix about this watcher too, by adding the following to the end of the `initializeMBS` function.

```js
  // ...
  lampix.watchers.add(mbsFruitsWatcher);
```

Now, `initializeMBS` should look like this:

```js
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
```
