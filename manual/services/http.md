# HTTP Service

A service provides an easy way to make HTTP request. It was built on the `request` package.

## Usage

You can use this service in promise-based or callback way.

``` javascript

import {HTTP} from "dotapp/services";

 try {

    // GET Requests

    let request = await HTTP.get("http://localhost:3033/api/post");

    if(request.statusCode == 200) {
        return res.ok(JSON.parse(request.body));
    }

    // POST Requests

    let request = await HTTP.post("http://localhost:3033/api/auth/register", {
        form: {
            first_name: "John",
            last_name: "Doe"
        }
    });

    if(request.statusCode == 200) {
        return res.ok(request.body);
    }

}catch(error) {
    return res.serverError(error);
}

```

The allowed methods are
- HTTP.get(uri, options)
- HTTP.post(uri, options)
- HTTP.put(uri, options)
- HTTP.patch(uri, options)
- HTTP.delete(uri, options)

`options` is object of `request` arguments such as form data and headers.

Reference: https://github.com/request/request
