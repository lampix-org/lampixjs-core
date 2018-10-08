# @lampix/core migration guide

## 0.x.x to 1.x.x

- [Watcher data structure](#watcher-data-structure)
- [Watcher add and remove](#watcher-add-and-remove)
- [Promise based API](#promise-based-api)
- [Registered watcher object](#registered-watcher-object)
- [Watcher index no longer necessary](#watcher-index-no-longer-necessary)

## Watcher data structure

### v0.x.x

```
{
  posX: number,
  posY: number,
  width: number,
  height: number,
  classifier: string // 'cls_loc_fin_all_small`, or 'segm_nes|thresh:0.5,circle:0.7,area:0.4'
}
```

The structure above represents the data required to create a watcher in **v0.x.x**.  
Watcher shape can only be a rectangle.
Passing extra information to Lampix can only be done through the `.classifier` prop via the parameters sent in an inline string.

### v1.x.x

```
{
  shape: {
    type: 'rectangle' | 'polygon',
    // rectangle
    data: { posX: number, posY: number, width: number, height: number }
    // or polygon
    data: [{ x: number, y: number }, { x: number, y: number }, { x: number, y: number }]
  },
  type: 'classifier' | 'segmenter',
  // NeuralNetworkClassifier, DepthClassifier, MovementBasedSegmenter etc.
  name: string,
  // params are optional
  // they will differ based on the name property
  // neural_network_name is a prop used with NeuralNetworkClassifier
  params: {},
  // Action to be triggered when something happens inside a watcher
  action: Function
}
```

- `shape` - describes the outline of the watcher. You may use `lampix.helpers.rectangle(x, y, w, h)` or `lampix.helpers.polygon([...])` to create the shape object.
- `type`
  - `classifier` - used when the location of the object is irrelevant (i.e buttons, toggles)
  - `segmenter` - used when the location of the object is relevant
- `name` - specifies the logic to run for the watcher
- `params` - provides further information that may be required based on the `name` prop
- `action` - function triggered by Lampix when something happens inside the watcher

## Watcher add and remove

### v0.x.x
```
import lampix from '@lampix/core';

const watchers = [
  { 
    posX: 100,
    posY: 100,
    width: 50,
    height: 50,
    classifier: 'cls_loc_fin_all_small'
  },
  {
    posX: 200,
    posY: 100,
    width: 50,
    height: 50,
    classifier: 'cls_loc_fin_all_small'
  }
];

lampix.registerSimpleClassifier(watchers, (index, recognizedClass) => {
  console.log(`Movement in watcher ${index}, class: ${recognizedClass}`);
});
```

### v1.x.x
```
import lampix from '@lampix/core';

const w1 = {
  type: 'classifier',
  name: 'NeuralNetworkClassifier',
  shape: lampix.helpers.rectangle(100, 100, 50, 50),
  params: {
    neural_network_name: 'fin_all_small'
  },
  action: (recognizedClass) => console.log(`Watcher 1 movement, class: ${recognizedClass}`)
};

const w2 = {
  type: 'classifier',
  name: 'NeuralNetworkClassifier',
  shape: lampix.helpers.rectangle(200, 200, 50, 50),
  params: {
    neural_network_name: 'fin_all_small'
  },
  action: (recognizedClass) => console.log(`Watcher 2 movement, class: ${recognizedClass}`)
};

lampix.watchers.add(w1, w2);
```

## Promise based API

**v0.x.x** doesn't notify when an action has completed on the device.  
**v1.x.x** fixes this issue via Promises.

```
lampix.watchers.add(w1, w2).then(() => console.log('Watchers ready to be used'));
lampix.watchers.remove(registeredWatcher1, registeredWatcher2).then(() => console.log('Watchers removed'));
lampix.getLampixInfo((data) => console.log('Lampix info: ', data));

// ...
```

## Registered watcher object

`lampix.watchers.add(w1, w2, ..., wN)` returns a Promise that resolves with *N* objects through which the newly added watchers can be managed. 

The registered watcher object provides convenience features such as `.remove()`, `.pause()` and `.resume()`.  
The information used to create the registered watcher can be found in the `.source` prop of the registered watcher object.

See the API reference for more information.

```
lampix.watchers.add(w1, w2).then((rw1, rw2) => {
  // Now that we can safely use these watchers, let's pause them
  rw1.pause(); // pause indefinitely
  rw2.pause(5000); // pause for 5 seconds only
});
```

## Watcher index no longer necessary

**v0.x.x** provides the index of the watcher where movement is detected along with other relevant information (classes, outlines, metadata), but it is up to the user to always remember what watcher corresponds to a particular index in order to perform custom actions per watcher.

**v1.x.x** fixes this issue by allowing the user to add an `.action` property on watchers either on the source data for the watcher or on the registered watcher itself. 

```
// ===== v1.x.x =====

const w1 = {
  ...,
  action: () => console.log('Action specific to w1');
}

const w2 = {
  ...
  // This one gets no action prop
};

lampix.watchers.add(w1, w2).then((rw1, rw2) => {
  // Setting the action for the second watcher at a later time
  rw2.action = () => console.log('Action specific to w2');
});
```
