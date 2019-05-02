import store from '../store/store'
import { mapState} from 'vuex';

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
     methods:{
          // isInUserPermissions(moduleName, rule) {
          //      let userWithPermissions =  this.userWithPermissions;
          //      if (userWithPermissions && userWithPermissions.permissions) {
          //          let userPermissions = userWithPermissions.permissions;
          //          for (var key in userPermissions) {
          //              if (userPermissions[key].moduleName === moduleName && userPermissions[key].rule === rule) {
          //                  return true;
          //              }
          //          }
          //          return false;
          //      }
          //  },
     },
     watch: {
          userData: {
              handler() {
                  if (this.userData && this.userData.id) {
                    //    console.log(this.userData)
                    //   this.userWithPermissions = this.userData.permissions;
                  }
              },
              immediate: true,
          },
      }
}

export default mixins;
