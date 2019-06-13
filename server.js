import app from "./app";
import Config from "~/services/config";
import Log from "~/services/log";

app.listen(
    Config.get('app.port'),
    () => Log.message('Server is listening at port ' + Config.get('app.port'), 'info')
);
