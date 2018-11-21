# `RegisteredWatcher`

Registered watcher objects are plain objects with a few convenience methods and properties. These objects can only be obtained via the [`.watchers.add`](./watchers.add.md) method (for the time being), and **all watcher management is done through the interface they provide**. If watcher management (e.g pausing, resuming, removing, updating) is required by an application, they should be saved in the app's state.

### Properties

* `source` (_Object_): A replica of the object provided to `.watchers.add`.
* `state` (_Object_): An object representing the current state of the registered watcher.
  * `active` (_boolean_): Represents whether computer vision processes are active for the watcher in question. Changed by `pause` and `resume` methods.
* `onClassification` (_Function_): Configurable handler for the classification event. See [Watcher](./watcher.md) for details.
* `onLocation` (_Function_, Optional): Configurable handler for the location event. See [Watcher](./watcher.md) for details.

### Methods

Note that all of these methods return a promise with no resolve value.

#### <a id='pause'></a>[`pause()`](#pause)

Pauses computer vision activity (classification, location) for the registered watcher.

#### <a id='resume'></a>[`resume()`](#resume)

Resumes computer vision activity (classification, location) for the registered watcher.

#### <a id='remove'></a>[`remove()`](#remove)

Removes the registered watcher.

##### Notes

Adding and removing watchers can have an impact on performance. If you intend to reuse the same watcher, consider using the [`pause`](#pause) and [`resume`](#resume) methods instead.

#### <a id='updateShape'></a>[`updateShape(shape)`](#updateShape)

Replaces the shape of a registered watcher with the new one provided. 
