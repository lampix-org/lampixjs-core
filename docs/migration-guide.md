# @lampix/core migration guide

## 0.x.x to 1.x.x

- [Watcher data structure](#watcher-data-structure)
- [Watcher names for commonly used classifier strings](#watcher-names-for-commonly-used-classifier-strings)
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
  // NeuralNetworkClassifier, DepthClassifier, MovementBasedSegmenter etc.
  name: string,
  // params are optional
  // they will differ based on the name property
  // neural_network_name is a prop used with NeuralNetworkClassifier
  params: {},
  // Action to be triggered when something is classified inside the watcher
  onClassification: Function,
  // Optional
  // Called before onClassification with contour information for the located objects
  onLocation: Function
}
```

- `shape` - describes the outline of the watcher. You may use `lampix.helpers.rectangle(x, y, w, h)` or `lampix.helpers.polygon([...])` to create the shape object.
- `name` - specifies the logic to run for the watcher ([examples](#watcher-names))
- `params` - provides further information that may be required based on the `name` prop
- `onClassification` - function triggered by Lampix when something is classified inside the watcher
- `onLocation` - optional function triggered by Lampix watchers before `onClassification`

## Watcher names for commonly used classifier strings

### cls_loc_fin_all_small

- uses a neural network => `name: 'NeuralNetworkClassifier'`
- need to specify neural network name => `params: { neural_network_name: 'fin_all_small' }`

```
{
  name: 'NeuralNetworkClassifier',
  params: {
    neural_network_name: 'fin_all_small'
  },
  ...
}
```

You can also use the `presets.button` as seen below:

```
import lampix from '@lampix/core';

function someCallback() {
  console.log('I will be called when a finger is recognized at x: 50, y: 50');
}

const w = lampix.presets.button(50, 50, someCallback);
lampix.watchers.add(w).then(([rw]) => console.log(w));
```

### segm_*

This applies to former *position classifiers* (currently referred to as *segmenters*) whose string started with `segm_`, such as `segm_cls_loc_nes`, `segm_cls_loc_cars`, `segm_cls_loc_bar` etc.

- uses a neural network => `name: 'MovementBasedSegmenter'`
- need to specify neural network name => `params: { neural_network_name: '*' }`, where * represents the strings after `segm_cls_loc`, `segm_cls_` or `segm_`

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
  console.log(`Watcher ${index}, class: ${recognizedClass}`);
});
```

### v1.x.x
```
import lampix from '@lampix/core';

const w1 = {
  name: 'NeuralNetworkClassifier',
  shape: lampix.helpers.rectangle(100, 100, 50, 50),
  params: {
    neural_network_name: 'fin_all_small'
  },
  onClassification: (recognizedObjects) => console.log(`Watcher 1, class: ${recognizedObject[0].classTag}`)
};

const w2 = {
  name: 'MovementBasedSegmenter',
  shape: lampix.helpers.rectangle(200, 200, 300, 300),
  params: {
    neural_network_name: 'fruits'
  },
  onClassification: (detectedObjects) => detectedObjects.forEach((do) => console.log(do.classTag, do.outline)),
  onLocation: (locatedObjects) => locatedObjects.forEach((lo) => console.log(lo.outline))
};

lampix.watchers.add(w1, w2);
```

## Promise based API

**v0.x.x** doesn't notify when an action has completed on the device.  
**v1.x.x** fixes this issue via Promises.

```
lampix.watchers.add(w1, w2).then(() => console.log('Watchers ready to be used'));
lampix.watchers.remove(registeredWatcher1, registeredWatcher2).then(() => console.log('Watchers removed'));
lampix.getLampixInfo().then((data) => console.log('Lampix info: ', data));

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

**v1.x.x** fixes this issue by allowing the user to add an `.onClassification` property on watchers either on the source data for the watcher or on the registered watcher itself. 

```
// ===== v1.x.x =====

const w1 = {
  ...,
  onClassification: () => console.log('Action specific to w1');
}

const w2 = {
  ...
  // This one gets no onClassification prop
};

lampix.watchers.add(w1, w2).then((rw1, rw2) => {
  // Setting onClassification handler for the second watcher at a later time
  // Same works for onLocation
  rw2.onClassification = () => console.log('Action specific to w2');
});
```
