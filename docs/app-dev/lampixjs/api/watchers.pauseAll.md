# `.watchers.pauseAll()`

Pauses all the currently registered watchers.  
**NOTE**: If a watcher is currently pending registration with Lampix, it will **NOT be paused**, as this methods concerns all of the watchers that have been registered successfully.

#### Returns

(`Promise<void>`): A promise that fulfills when all of the registered watchers have been paused. If a registered watcher is already paused, it will simply resolve automatically, bypassing Lampix.

#### Example

```js
import lampix from '@lampix/core';

const state = {
  registeredWatchers: []
};

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
    state.registeredWatchers = registeredWatchers;

    // Remove them right away!
    // The removal expression below is equivalent to 
    return lampix.watchers.pauseAll();
  })
  .then(() => {
    // watcher1 and watcher2 are now paused
    console.log(registeredWatchers[0].state.active); // false
    console.log(registeredWatchers[1].state.active); // false
  });
```

#### Notes

You can pause a single registered watcher by using its [`.pause()`](./registered-watcher.md#pause) method as well.
