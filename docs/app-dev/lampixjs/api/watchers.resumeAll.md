# `.watchers.resumeAll()`

Resumes all the currently registered watchers.  

#### Returns

(`Promise<void>`): A promise that fulfills when all of the registered watchers have been resumed. If a registered watcher is not paused, it will simply resolve automatically, bypassing Lampix.

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

    return lampix.watchers.resumeAll();
  })
  .then(() => {
    // watcher1 and watcher2 are now resumed
    console.log(registeredWatchers[0].state.active); // true
    console.log(registeredWatchers[1].state.active); // true
  });
```

#### Notes

You can resume a single registered watcher by using its [`.resume()`](./registered-watcher.md#resume) method as well.
