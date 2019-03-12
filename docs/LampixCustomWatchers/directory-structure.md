# Application Directory Structure

<br>
<br>

__The working directory is assumed to be the directory of the application for which the Custom Watcher is implemented.__

```

.qr-detector-app
│   app.js
│   index.html    
│   package.json
│   README.md
│   vendor.js
│
└─── watchers
        └─── qr-code-detector
                    └─── qr-code-detector.py

```

__IMPORTANT:__ Note that the directory in which the `.py` file is placed, should be named exactly as the `.py` file.