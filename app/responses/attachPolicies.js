export default function (data, module = false) {

    if (module) {

        if (Array.isArray(data)) {

            return data.map(row => {

                if (typeof row == 'object') {

                    row = row.toObject({virtuals: true, getters: true});

                    row.policies = _config("permissions." + module, [])
                        .filter(action => {
                            return this.req.can(module + "." + action, row);
                        }).map(action => {
                            return module + "." + action;
                        });
                }

                return row;
            });

        } else {

            if (typeof data == 'object') {

                data = data.toObject({virtuals: true, getters: true});

                data.policies = _config("permissions." + module, [])
                    .filter(action => {
                        return this.req.can(module + "." + action, data);
                    }).map(action => {
                        return module + "." + action;
                    });

                return data;
            }
        }
    }

    return data;
};
