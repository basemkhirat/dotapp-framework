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

            return data.map(row => {

                if (typeof row == 'object') {

                    let model = row;

                    row = row.toObject();

                    row.policies = Config.get("permissions." + module, [])
                        .filter(action => {
                            return this.req.can(module + "." + action, model);
                        }).map(action => {
                            return module + "." + action;
                        });
                }

                return row;
            });

        } else {

            if (typeof data == 'object') {

                let model = data;

                data = data.toObject();

                data.policies = Config.get("permissions." + module, [])
                    .filter(action => {
                        return this.req.can(module + "." + action, model);
                    }).map(action => {
                        return module + "." + action;
                    });

                return data;
            }
        }
    }

    return data;
};
