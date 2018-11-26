# Simulator installation

## Download

* [Windows](https://s3.amazonaws.com/simulator.lampix.com/lampix-simulator-master.exe)
* [macOS](https://s3.amazonaws.com/simulator.lampix.com/lampix-simulator-master.dmg)
* [Linux](https://s3.amazonaws.com/simulator.lampix.com/lampix-simulator-master.AppImage)

### Linux extra step

Make the .AppImage file executable.

* `chmod +x <path-to-AppImage>`
* Run

### Considerations

* auto updates are enabled on all platforms (this is only available for signed and trusted applications)
* **Windows** and **macOS** versions are signed (Linux does not require this)
* **Windows** version may still warn against running the app, in spite of being signed, due to the nature of the certificate used. In short, there are two certificate types for Windows, one of which can be used with a cloud based CI/CD platform and builds trust over time.
