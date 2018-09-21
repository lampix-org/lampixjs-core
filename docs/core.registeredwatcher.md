[Home](./index) &gt; [@lampix/core](./core.md) &gt; [RegisteredWatcher](./core.registeredwatcher.md)

# RegisteredWatcher interface

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [`_id`](./core.registeredwatcher._id.md) | `string` |  |
|  [`active`](./core.registeredwatcher.active.md) | `boolean` | Active status of the area |
|  [`source`](./core.registeredwatcher.source.md) | `Watcher.Watcher` |  |

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`pause(time)`](./core.registeredwatcher.pause.md) | `void` | Makes the area inactive indefinitely or for a specified time |
|  [`remove()`](./core.registeredwatcher.remove.md) | `Promise<void>` | Removes area from list of watched areas. This clears all resources related to this watcher on the device. If you aim to reuse the area shortly after disabling it, consider using [pause](./core.registeredwatcher.pause.md) instead. |
|  [`resume()`](./core.registeredwatcher.resume.md) | `void` | Makes the area active |

