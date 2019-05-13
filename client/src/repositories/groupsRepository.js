import Repository from "./Repository";

const resource = "/role";

export default {
    getGroup(id) {
        return Repository.get(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    updateGroup(id, data) {
        return Repository.put(`${resource}/${id}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deleteGroup(id) {
        return Repository.delete(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    getAllGroups(page, limit) {
        return Repository.get(`${resource}?page=${page}&limit=${limit}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    newGroup(data) {
        return Repository.post(`${resource}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data;
        })
    },
};
