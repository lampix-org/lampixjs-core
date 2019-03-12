# Watcher base class - inherited methods

<br>

## Creating an object for report purposes

```python
@staticmethod
def create_formatted_object(object_id=None, center=None, contour=None, class_tag=None, metadata=None, 
                            **kwargs):
```

### Parameters
__All of the following parameters are optional and should be used as required by the web application.__

* `object_id` - an id for the detected/classified object, so it can be further identified in JS
* `center` - as a (x, y) point that represents the contour center of the detected/classified object
* `contour` - as a list of points (x, y) that can be reshaped and which represents a single contour
* `class_tag` - object class, only if a classification process was performed
* `metadata` - extra information that will be reported
* `**kwargs` - any pair of keyword_argument=arg


### Examples:
* `self.create_formatted_object(data={'custom_key': 'some_custom_data'})`

* `self.create_formatted_object(center=(2, 4), contour=[(1, 3), (1, 4), (1, 5), (3, 5)])`

#### The contours returned by OpenCV functions work as well:

```python

_, contours, _ = cv2.findContours(img, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE) 
for target_contour in contours:
    current_object = self.create_formatted_object(contour=target_contour)

```
