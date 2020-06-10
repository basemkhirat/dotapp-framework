import user from "~/policies/modules/user";
import role from "~/policies/modules/role";

export default {
    ...user,
    ...role,
};
