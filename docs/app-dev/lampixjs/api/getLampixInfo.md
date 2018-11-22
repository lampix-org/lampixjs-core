# `.getLampixInfo()`

Retrieve environment (Lampix or simulator) information.

#### Returns

(`Promise<void>`): A promise that fulfills with a plain descriptor object with the following properties:

* `id` (_string_): Unique ID for Lampix or simulation
* `version` (_string_): Current version of Lampix or the simulator
* `isSimulator` (_boolean_): Whether the current environment is a simulation or Lampix

#### Example

```js
import lampix from '@lampix/core';

lampix.getLampixInfo()
  .then(console.log); // example { id: <unique-id>, version: '1.2.3', isSimulator: false }
```
