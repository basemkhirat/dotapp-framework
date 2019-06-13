import Config from '~/services/config';

/**
 * attach response with user policies
 * @param data
 * @param module
 * @returns {*}
 */
export default function (data, module = false) {

    if (module) {

        if (Array.isArray(data)) {

            return data.map(model => {

                if (typeof model == 'object') {

                    let row = model.toObject();

                    row.policies = Config.get("permissions." + module, [])
                        .filter(action => {
                            return this.req.can(module + "." + action, model);
                        }).map(action => {
                            return module + "." + action;
                        });

                    return row;
                }

            });

        } else {

            if (typeof data == 'object') {

                let data_object = data.toObject();

                data_object.policies = Config.get("permissions." + module, [])
                    .filter(action => {
                        return this.req.can(module + "." + action, data);
                    }).map(action => {
                        return module + "." + action;
                    });

                return data_object;
            }
        }
    }

    return data;
};
