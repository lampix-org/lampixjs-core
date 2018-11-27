# Basics

## Terminology

* `simulator` is used to refer to the main window (the one with the address bar for loading applications)
* `simulation` is used to refer to a simulated application's window

## Accepted protocols

### <a id='file'></a>[`file:`](#file)

* used to load local files
* can be used via the address bar manually
* can be used by dragging and dropping either a folder with `index.html` in it or an HTML file in the main simulator interface
* `writeJsonToFile` writes in the same directory as the loaded HTML file

#### Notes

Since `localStorage` data is isolated on a per origin basis AND the origin of all URLs using the `file:` protocol is `file://`, data separation cannot be achieved with this protocol. If this is a concern for you, use [the http protocol](#http) instead.

#### Example

`file:///home/username/project/super-app/index.html`  
`file:///d:/super-app/index.html`  

### <a id='http'></a>[`http(s):`](#http)

* used to load served web applications (it doesn't matter whether the server is local or remote)
* can be used via the address bar manually
* `writeJsonToFile` writes in the [`user data`](https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname) directory, in a folder called `webapps-data`

#### Example

`http://localhost:3000`  
`https://super.remote.app`  

### <a id='simulator'></a>[`simulator:` (experimental)](#simulator)

* serves applications in the `webapps` folder found in the [`user data`](https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname) directory
* `writeJsonToFile` writes in the [`user data`](https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname) directory, in a folder called `webapps-data`

#### Notes

Though `simulator:` URLs resemble [`file:`](#file) URLs, these do benefit from separation of `localStorage` data (as the origin is determined to be `simulator://app-name`).

#### Examples

`simulator://super-app`  
`simulator://super-duper-app`  

## Selecting watchers and the recognized class

1. In the simulator, open the expansion panel in the middle that says `Simulator <your-url>`
2. Select the watcher name
3. Select the recognized class
4. In the simulation, click inside the area of a matching registered watcher
