# `.transformRectCoords(...rectCoords)`

Convert coordinates from a rectangle descriptor using camera coordinates to projector coordinates (or vice versa).

#### Returns

(`Promise<RectCoords[]>`): A promise that fulfills with a list of rectangle descriptors with converted coordinates.

#### Example

```js
import lampix from '@lampix/core';

lampix.transformRectCoords({
  posX: 100,
  posY: 200,
  width: 30,
  height: 100,
  camera: true
}).then((transformCoordinates) => {
  console.log(transformCoordinates[0]); // fictitious values: { posX: 200, posY: 400, width: 60, height: 200 }
});
```

#### Notes

**It's important to understand** the difference between Lampix and the simulator when using this function:

* Lampix will return real coordinates as seen in either the camera or the projector.
* The simulator will return values that depend on the `scaleFactor` property in its config, which defaults to `1`, meaning it will return the same values if the `scaleFactor` was not changed.
