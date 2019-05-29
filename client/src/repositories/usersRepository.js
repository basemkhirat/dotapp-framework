import Repository from "./Repository";

const resource = "/user";

export default {
    getUser(id) {
        return Repository.get(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    updateUser(id, data) {
        return Repository.put(`${resource}/${id}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deleteUser(id) {
        return Repository.delete(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deleteUsers(ids) {
        return Repository.patch(`${resource}/?operation=delete&ids=${ids}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    updateUsers(ids) {
        return Repository.patch(`${resource}/?operation=update&ids=${ids}&data[status]=0`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },

    getAllUsers(page, limit, filters = {}) {

        let groupQuery = (filters.group && filters.group !== '') ? '&role=' + filters.group : '';
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&q=' + filters.searchQuery : '';
        let filterQuery = groupQuery + searchQuery;

        return Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    newUser(data) {
        return Repository.post(`${resource}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data;
        })
    },
};
