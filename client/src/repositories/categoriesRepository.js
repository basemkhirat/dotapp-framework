import Repository from "./Repository";

const resource = "/category";

export default {
    getCategory(id) {
        return Repository.get(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    updateCategory(id, data) {
        return Repository.put(`${resource}/${id}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deleteCategory(id) {
        return Repository.delete(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deleteCategories(ids) {
        return Repository.patch(`${resource}/?operation=delete&ids=${ids}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    getAllCategories(page, limit) {
        return Repository.get(`${resource}?page=${page}&limit=${limit}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    newCategory(data) {
        return Repository.post(`${resource}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data;
        })
    },
};
