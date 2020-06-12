#!/usr/bin/env node

import app from "./app";
import {Config, Log} from "dotapp/services";

app.listen(
    Config.get('app.port'),
    () => Log.message('Server is listening at port ' + Config.get('app.port'), 'info')
);
