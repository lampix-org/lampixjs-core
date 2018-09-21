[Home](./index) &gt; [@lampix/core](./core.md) &gt; [RegisteredWatcher](./core.registeredwatcher.md) &gt; [remove](./core.registeredwatcher.remove.md)

# RegisteredWatcher.remove method

Removes area from list of watched areas. This clears all resources related to this watcher on the device. If you aim to reuse the area shortly after disabling it, consider using [pause](./core.registeredwatcher.pause.md) instead.

**Signature:**
```javascript
remove(): Promise<void>;
```
**Returns:** `Promise<void>`

