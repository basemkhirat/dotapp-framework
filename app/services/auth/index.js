import User from '~/models/user';

class Index {

    /**
     * define requested user
     * @param id
     * @param callback
     */
    user(id, callback) {

        User.findOne(id).populate('role').exec((error, user) => {
            callback(error, user);
        });
    }

    /**
     * check user permissions
     * @param permissions
     * @returns {boolean}
     */
    can(...permissions) {

        let requested_permissions = [];

        permissions.forEach((permission) => {
            if(Array.isArray(permission)){
                requested_permissions = new_permissions.concat(permission);
            }else{
                requested_permissions.push(permission);
            }
        });

        if(requested_permissions.length == 0){
            return false
        }

        let user = this.req.user;

        if (user) {

            let direct_permissions = user.permissions;

            let role_permissions = user.role ? user.role.permissions : [];

            let user_permissions = role_permissions.concat(direct_permissions);

            return requested_permissions.every((permission) => {
                return user_permissions.indexOf(permission) > -1;
            });
        }

        return false;
    }
}

export default new Index();
