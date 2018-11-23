# `.getApps()`

Retrieve the available apps to switch to. Currently only used by the `app-switcher`.

#### Returns

(`Promise<AppInfo[]>`): A promise that fulfills with a list of plain objects describing the available apps. `AppInfo` objects have the following properties:

* `name` (_string_): App name.
* `package_data` (_Object_): Information contained in `package.json` for each app.

#### Example

```js
import lampix from '@lampix/core';

lampix.getApps()
  .then((apps) => {
    console.log(apps[0]) // { name: some-name, package_data: {} }
  });
```
