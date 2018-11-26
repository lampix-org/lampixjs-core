# `.watchers.add(...watchers)`

Registers one or more areas to watch with Lampix.

#### Arguments

1. `...watchers` ([`Watcher[]`](./watcher.md)) Comma separated watcher objects or one level deep arrays of watcher objects.


#### Returns

([`Promise<RegisteredWatcher[]>`](./registered-watcher.md)): A promise that fulfills with a list of [`RegisteredWatcher`](./registered-watcher.md) objects, equal in length to the number of watcher objects provided to the function

#### Example

```js
import lampix from '@lampix/core';

const draw = (recognizedObject) => {
  // Drawing amazing effects
};

const watcher = {
  name: 'DepthClassifier',
  shape: lampix.helpers.rectangle(0, 0, window.innerWidth, window.innerHeight),
  onClassification: (recognizedObjects) => {
    recognizedObjects.forEach(draw);
  }
};

lampix.watchers.add(watcher)
  .then((registeredWatchers) => {
    console.log(registeredWatchers.length); // 1
  });
```

#### Notes

If the method receives arrays, it will concatenate them into a single array that will be sent to Lampix. The promise will be resolved with a single array of watchers, in the same order that they were added. For instance:

```js
import lampix from '@lampix/core';

const draw = (recognizedObject) => {
  // Drawing amazing effects
};

const watcher = {
  name: 'DepthClassifier',
  shape: lampix.helpers.rectangle(0, 0, window.innerWidth, window.innerHeight),
  onClassification: (recognizedObjects) => {
    recognizedObjects.forEach(draw);
  }
};

const otherWatchers = {
  {
    // ...
  },
  {
    // ...
  }
}

lampix.watchers.add(watcher, otherWatchers)
  .then((registeredWatchers) => {
    console.log(registeredWatchers.length); // 3
    console.log(registeredWatchers); // registered watchers corresponding to watcher, otherWatchers[0] and otherWatchers[1], in this order
  });
```
