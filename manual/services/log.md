# Log Service

A service provides an easy way to log information, warning and errors based on `winston` package.

## Usage

You can use this service using this way.

``` javascript

import {Log} from "dotapp/services";

Log.message('<message>', '<log level>');

Log.message("this is an information message", "info");
Log.message("this is an error message", "error");
Log.message("this is a warning message", "warn");
```

Reference: https://github.com/winstonjs/winston
