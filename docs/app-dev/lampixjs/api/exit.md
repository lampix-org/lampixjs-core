# `.exit()`

Switch back to the default app or the app specified in the `switch-back-to` query param specified in [`switchBackTo()`](./switchBackTo.md).

(`Promise<void>`): A promise that fulfills without arguments.

#### Example

```js
import lampix from '@lampix/core';

lampix.exit();
```
