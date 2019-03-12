# QRCodeDetector
- [The Watcher base class](#the-watcher-base-class)
- [Vision trigger](#vision-trigger)
- [Triggering the Watcher](#triggering-the-watcher)
- [Retrieving the Watcher's frame](#retrieving-the-watchers-frame)
- [QR Code detection](#qr-code-detection)
- [Report data to JavaScript](#report-data-to-javascript)

***


## The Watcher base class

We will start off by extending the Watcher base class that is present in the Lampix Software Stack.
```python
# The images will be processed using OpenCV and Numpy
import cv2
import numpy

# The decode_qrcode function will be used for decoding the found QR Code
from pyzbar.pyzbar import decode as decode_qrcode

# Used for sending the logs to the ':8888/logs' endpoint
import logging
# For identifying the source of the logs
logger = logging.getLogger("lampix.QRCodeDetector")

from lampix_imports.watcher import Watcher
# Will be used to specify the used trigger for this Watcher
from lampix_imports.watcher import TriggerType

class QRCodeDetector(Watcher):
    # Calling the base class constructor
    # The id will be received from JS
    def __init__(self, id, contour):
        # self.contour is the property which holds the Watcher's contour
        Watcher.__init__(self, id, contour)
```

<br>

## Vision trigger

The `get_vision_trigger()` method has to be implemented. It will return the trigger 
type: `TriggerType.TRIGGER_RGB` / `TriggerType.TRIGGER_DEPTH`.
If a trigger based on an object's height is needed, `TriggerType.TRIGGER_DEPTH` will be used.


```python
def get_vision_trigger(self):
    return TriggerType.TRIGGER_RGB
```

<br>

## Triggering the Watcher   
<div style="text-align: justify">

A Watcher is triggered by using either an RGB Trigger or a Depth Trigger. In both cases, it is mandatory 
to overwrite
the `on_movement()` method. This method will contain the code that is executed on __EVERY FRAME__ in which
an object intersects with the Watcher's zone.

</div>

```python
def on_movement(self, depth_frame, gray_frame, color_frame, movement_mask):
    # Code that will be executed when an object is placed on the projection surface, 
    # exactly where the watcher was registered
    logger.info('The QRCodeDetector Watcher was triggered')
```
#### Parameters
* `depth_frame` - Camera frame, as a `numpy.uint8` depth frame - Full HD `numpy.ndarray`
* `gray_frame` - Camera frame, as a grayscale frame - Full HD `numpy.ndarray`
* `color_frame` - Camera frame, as a BGR (blue, green, red) frame, OpenCV compatible - Full 
HD `numpy.ndarray`
* `movement_mask` - The mask of the contour that has triggered the Watcher - Full HD `numpy.ndarray`

<br>

## <a id='retrieving-the-watchers-frame'></a>[Retrieving the Watcher's frame](#retrieving-the-watchers-frame)

<div style="text-align: justify">

The frame bounded by the Watcher will be retrieved from the `self.contour` property,
in the `on_movement()` method, as shown below:

</div>

```python
x, y, width, height = cv2.boundingRect(self.contour.astype(numpy.int))
```

* `x`, `y` - the top left X and Y coordinates of the registered zone's bounding box
* `width`, `height` - the width and height of the said bounding box

<br>

## QR Code detection

```python
# Cropping the color_frame and getting the ROI (Region of Interest) containing the object that triggered the Watcher
qr_code_roi = color_frame[y:y + height, x:x + width]

# Decoding the QR Code and retrieving the data
qr_code = decode_qrcode(qr_code_roi)[0]
qr_code_data = qr_code.data
```

<br>


## Report data to JavaScript
<div style="text-align: justify">

By extending [the Watcher base class](#the-watcher-base-class), the method `self.report_to_js(object)` is inherited.
This method will be used to report a list of formatted objects, containing the data that is needed in the web 
application.

</div>

```python
if len(qr_code_data):
    # The self.report_to_js() method requires a list of formatted objects

    # Reporting to JS that a valid QR Code was located
    reported_object = self.create_formatted_object(message="QR Code located.")
    self.report_to_js([reported_object], method='located')
    
    '''
    Once the additional processing is finished and the data is available (in this case, the data was
    previously retrieved), it is possible to report to JS that the object was successfully classified.
    '''
    reported_object = self.create_formatted_object(metadata=qr_code_data)
    self.report_to_js([reported_object], method='classified')
else:
    reported_object = self.create_formatted_object(message="QR Code not detected.")
    self.report_to_js([reported_object], method='located')
```
The inherited `self.create_formatted_object()` method is documented [here](./create-formatted-object.md).

<br>

## Extra: 

### The motion trigger

<div style="text-align: justify">

The Watcher's `self.trigger_motion` member comes as a solution to the problem of not knowing when an object was removed from 
the Watcher's zone (e.g., It is used for detecing when a finger is removed from a button - simulating an unpress).
It is needed as the `on_movement()` method, by default, won't be triggered if an object is not intersecting the Watcher's
region of interest.

</div>

#### Example:

```python
if len(current_class == 1):  # A finger is present in the Watcher's frame
    self.trigger_motion = True  # Triggering 'on_movement()' again
```

This will essentially call the `on_movement()` method one more time (the member is automatically set to `False`) where the
object will be `classified` or `located` once more.

<br>

### Multithreaded processing

<div style="text-align: justify">

The `self.deferred_processing()` method is used for CPU intensive tasks that need to be run in a separate
thread.
To be successfully used, the `self.needs_deferred_processing` member has to be set to `True`.

__IMPORTANT:__ there is no method of synchronizing the `on_movement()` method call and the call of
the `self.deferred_processing()` method. Although, a mechanism based on events can be implemented and used
as means of inter-thread communication.


#### Example:

```python
self.needs_deferred_processing = True

def deferred_processing():
    # Code that will be executed in a separate thread
    # Avoid infinite loops

```

<br>

### Watcher removal

#### Example:
```python
def on_delete(self):
    """
    Code that will be executed on Watcher's removal
    e.g. closing connections
    """
    
    pass
```

</div>
