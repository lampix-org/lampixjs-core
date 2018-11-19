# Up and Running

## Prerequisites

- Node.js and NPM (via [installer](https://nodejs.org/en/), recommended for Windows, or via [node version manager](https://github.com/creationix/nvm), recommended for Linux and macOS)

## Downloading and installing the simulator

### Windows

* [Download](https://s3.amazonaws.com/simulator.lampix.com/lampix-simulator-master.exe)
* Install

### macOS

* [Download](https://s3.amazonaws.com/simulator.lampix.com/lampix-simulator-master.dmg)
* Install

### Linux

* [Download](https://s3.amazonaws.com/simulator.lampix.com/lampix-simulator-master.AppImage)
* `chmod +x <path-to-AppImage>`
* Run

## Using the sample app

```sh
git clone git@github.com:lampix-org/minimal-sample.git  
cd minimal-sample
npm install
npm start
```

This will start a development server at `http://localhost:8080`, provided that port is free to use. Otherwise, check the terminal output to find out the URL to go to.  

## Loading it inside the simulator

* Start the simulator
* Enter the URL in the address bar at the top of the simulator
* Press _Enter_ or the _Load_ button

If the URL is valid, a new window with the simulated app will open.

## Selecting watchers and the recognized class

The sample app uses finger detection, which corresponds to `NeuralNetworkClassifier` as the watcher name, with `0` as no finger detected and `1` as finger detected.

Steps:

* in the main window (the one used to load apps), open the expansion panel in the middle that says `Simulator <your-url>`
* select `NeuralNetworkClassifier` as the watcher name
* select `1` as the recognized class
* in the simulated app window, click the "Increase Count" button

Note that you will only be able to use `1` once until you use `0` to deactivate the button.
