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
    def __init__(self, id, contour):
        # self.contour is the property which holds the corners of the registered area
        Watcher.__init__(self, id, contour)
    
    def get_vision_trigger(self):
        return TriggerType.TRIGGER_RGB

    def on_movement(self, movement, depth, frame, grey_frame, color_frame, seg_frame):
        """
        Code that will be executed when an object is placed on the projection surface, 
        exactly where the watcher was registered
        """

        logger.info('The QRCodeDetector Watcher was triggered')

        x, y, width, height = cv2.boundingRect(self.contour.astype(numpy.int))


        # Cropping the color_frame and getting the ROI (Region of Interest) containing the object that triggered the Watcher
        qr_code_roi = color_frame[y:y + height, x:x + width]

        # Decoding the QR Code and retrieving the data
        qr_code = decode_qrcode(qr_code_roi)[0]
        qr_code_data = qr_code.data

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

    def on_delete(self):
        """
        Code that will be executed on Watcher's removal
        e.g. closing connections
        """
    
        pass