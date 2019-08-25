#!/usr/bin/env node

import app from "./app";
import Config from "dotapp/services/config";
import Log from "dotapp/services/log";

app.listen(
    Config.get('app.port'),
    () => Log.message('Server is listening at port ' + Config.get('app.port'), 'info')
);
