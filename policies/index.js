import user from "~/policies/modules/user";
import role from "~/policies/modules/role";

export default {
    user,
    role,
    book: {

         view: (req, done) => {


                setTimeout(() => {
                    done(true);
                }, 8000);


        }
    }
};
