[Home](./index) &gt; [@lampix/core](./core.md) &gt; [PublicAPI](./core.publicapi.md) &gt; [WatcherRegistrar](./core.publicapi.watcherregistrar.md) &gt; [remove](./core.publicapi.watcherregistrar.remove.md)

# WatcherRegistrar.remove method

Remove one or more comma separated registered watchers

**Signature:**
```javascript
remove(...registeredWatchers: RegisteredWatcher[]): Promise<void>;
```
**Returns:** `Promise<void>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `registeredWatchers` | `RegisteredWatcher[]` | List of[RegisteredWatcher](./core.registeredwatcher.md) objects to remove |

