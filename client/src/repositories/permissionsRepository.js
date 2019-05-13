import Repository from "./Repository";

const resource = "/permission";

export default {
    getAllPermissions() {
        return Repository.get(`${resource}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
};
