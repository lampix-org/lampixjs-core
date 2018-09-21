[Home](./index) &gt; [@lampix/core](./core.md) &gt; [PublicAPI](./core.publicapi.md) &gt; [WatcherRegistrar](./core.publicapi.watcherregistrar.md) &gt; [add](./core.publicapi.watcherregistrar.add.md)

# WatcherRegistrar.add method

Add one or more comma separated watchers

**Signature:**
```javascript
add(...watchers: Watcher.Watcher[]): Promise<RegisteredWatcher[]>;
```
**Returns:** `Promise<RegisteredWatcher[]>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `watchers` | `Watcher.Watcher[]` | List of[Watcher.Watcher](./core.watcher.watcher.md) objects to register |

