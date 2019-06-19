import store from '../store/store'
import {
    mapState
} from 'vuex';

const mixins = {
    store: store,
    data() {
        return {
            userWithPermissions: [],
        }
    },
    computed: {
        ...mapState({
            userData: state => state.login.userData,
        })
    },
    methods: {
        isInUserPermissions(rule) {
            let userWithPermissions = this.userWithPermissions;
            if (userWithPermissions) {
                let userPermissions = userWithPermissions;
                for (var key in userPermissions) {
                    if (userPermissions[key] === rule) {
                        return true;
                    }
                }
                return false;
            }
        },

    },
    watch: {
        userData: {
            handler() {
                if (this.userData && this.userData.permissions) {
                    this.userWithPermissions = this.userData.permissions;

                }
            },
            immediate: true,
        },
    }
}

export default mixins;
