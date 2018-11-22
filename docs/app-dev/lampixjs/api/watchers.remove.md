# `.watchers.remove(...registeredWatchers)`

Removes one or more registered watchers from Lampix.

#### Arguments

1. `...registeredWatchers` ([`RegisteredWatcher[]`](./registered-watcher.md)) Comma separated RegisteredWatcher objects


#### Returns

(`Promise<void>`): A promise that fulfills when all of the registered watchers have been removed from Lampix.

#### Example

```js
import lampix from '@lampix/core';

const draw = (recognizedObjects) => {
  // Drawing amazing effects
};

const watcher1 = {
  name: 'DepthClassifier',
  shape: lampix.helpers.rectangle(0, 0, window.innerWidth / 2, window.innerHeight),
  onClassification: draw
};

const watcher2 = {
  name: 'DepthClassifier',
  shape: lampix.helpers.rectangle(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight),
  onClassification: draw
};

lampix.watchers.add(watcher1, watcher2)
  .then((registeredWatchers) => {
    // Remove them right away!
    // The removal expression below is equivalent to 
    // 1. lampix.watchers.remove.apply(null, registeredWatchers);
    // 2. lampix.watchers.remove(registeredWatchers[0], registeredWatchers[1]);
    return lampix.watchers.remove(...registeredWatchers);
  })
  .then(() => {
    console.log('Registered watchers removed');
  });
```
