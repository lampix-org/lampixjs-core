# Application Structure

```
- index.html (required)
- package.json (required)
- config.json (optional)
- schema.json (optional)
- <rest of the app files>
```

## index.html

This is the entry point of an application, and must exist in order for an app to start.

## package.json

Each application must have a package.json metadata file that describes the app.
The fields that are most relevant to Lampix, my.lampix.com and / or the App Switcher are:

* **name** (e.g "app-switcher", "trivia", "restaurant", "game-changing-app-nine-thousand" etc.)
  * the name must not start with a dot or an underscore
  * new packages must not have uppercase letters in the name
  * only letters found in the English alphabet are allowed
  * no special characters other than "-" can be used
* **version**, following [semver rules](https://semver.org/)
* **description**, a short introduction for the app that will be displayed in the App Switcher
* **icon**, relative path to an icon to use as the app logo in the App Switcher
* **author**, an object with the required *name* and *email* fields, and an optional *url* field to point to the author's site
* **displayName**, used to set a different name than in the **name** to be used in the App Switcher (can be any valid string)
* **lampixConfig**, an object providing information strictly related to the app's behavior on a Lampix
  * **lampixVersion**, specifies a range of versions the app is compatible with (e.g "2.0.0", ">= 2.0.0 <= 10.5.1" etc. - as seen on [NPM semver's package](https://docs.npmjs.com/misc/semver#ranges)). The current version is "2.1.0"
  * **showInAppSwitcher**, used to prevent or force its showing in the App Switcher (true, by default)

### Example

```js
{
  "name": "trivia",
  "displayName": "Trivia",
  "version": "1.1.1",
  "description": "Test your knowledge on different topics",
  "author": {
    "name": "Your name",
    "email": "your@email.com"
  },
  "lampixConfig": {
    "lampixVersion": "2.1.0",
    "showInAppSwitcher": true
  }
}
```

**NOTE**: You don't need to keep track of two *package.json* files if your app already uses one. You can use the one NPM uses, and Lampix will only use the fields specified above. **It is important to know** that the `getApps()` function returns a list of all the available apps with *ALL* the metadata in *package.json* (at least for now).

## config.json and schema.json

**config.json** contains arbitrary information, as the application demands it, whether it's a list of strings, an enormous JSON 20 levels deep or something else. For example, configurable questions for a trivia or a survey style app could belong in config.json

**schema.json** works in tandem with config.json AND my.lampix.com, as it is used to define the structure of the data in config.json and the expected types (numeric, boolean, string, lists, objects, enum values). Based on this file, my.lampix.com will generate a custom form that can be used to edit *config.json* without having to redeploy the app.

**IMPORTANT**: Should the data structure change, that means the application itself will no longer work with the new structure, so the application, config.json and schema.json all need to be updated and the application redeployed.

**getAppConfig** is the method used to retrieve the data found in config.json. As is tradition, this will be an asynchronous request and the data will be available on the success function of the promise returned.
