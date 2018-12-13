## 1.0.0
##### *Dec 13, 2018*

Highlights:

- `.presets.button` accepts optional `{ width, height }` object to allow changing the size of the button from the default of 50x50

## 1.0.0-beta.6
##### *Dec 5, 2018*

Highlights:

- added optional `{ width, height }` parameter in `.presets.buttons`, making the signature `(x, y, callback, opts?)`

## 1.0.0-beta.5
##### *Nov 26, 2018*

Highlights:

* `.watchers.add` now allows lists of watcher objects as well as plain watcher objects, resolving the promise with a single array

## 1.0.0-beta.4
##### *Nov 26, 2018*

Highlights:

* a changelog was born

Captain's log:

* return early in `waitForApi` to avoid "Cannot read property 'push' of null"
