import path from 'path';
import fs from 'fs';
import walkSync from 'walk-sync';

export default new class {

    constructor() {

        let directory = path.join(process.cwd(), "prototypes");

        walkSync(directory).forEach(function (file) {

            if (fs.statSync(path.join(directory, file)).isFile()) {

                let methods = require(path.join(directory, file)).default;
                let type = eval(path.parse(file).name);

                for(let method in methods){
                    type.prototype[method] = methods[method];
                }
            }
        });
    }
};
