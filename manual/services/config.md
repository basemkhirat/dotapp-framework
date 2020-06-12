# Config Service

A service provides an easy way to get values from stored configuration files in `config` directory.

## Usage

You can use this service using this way.

``` javascript

import {Config} from "dotapp/services";

Config.get("app.url");

// returns value of url

/*
    http://localhost:3000
*/

Config.get("app");

// returns app file config object

/*
{
    url: "http://localhost:3033",
    debug: "true",
    port: "3033",
    trust_proxy: "true",
    view_engine: "ejs",
    views: "views",
}
*/
```
