# Lampix Custom Watchers

<br>
<br>

## Functionality
<div style="text-align: justify">

Lampix uses watchers to define how web applications can be interacted with in its context. 
Each watcher can be thought of as behavior for the device that is translated into data for the web app. 
The device is capable of triggering the Watchers by using an RGB trigger 
(it detects the changes in a specific zone, defined by the Watcher) or a DEPTH trigger.

The [Lampix Watchers](https://api.lampix.co/application-development/standard-watchers) are actively used 
for detecting button presses, object movement, object height and object shape.

A Custom Watcher brings the possibility of adding completely new behavior for Lampix 
(e.g., by implementing a [QRCodeClassifier](./QRCodeDetector.md), 
we will be able to detect QR Codes and pass the encoded information to the web application).

</div>
