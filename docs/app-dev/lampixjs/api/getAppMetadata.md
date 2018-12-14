# `.getAppMetadata()`

Retrieve the contents of the `package.json` file.

#### Returns

(`Promise<object>`): A promise that fulfills with a plain object.

#### Example

```js
import lampix from '@lampix/core';

lampix.getAppMetadata()
  .then((pkg) => {
    console.log(pkg.name); // logs the name property from package.json
  });
```
