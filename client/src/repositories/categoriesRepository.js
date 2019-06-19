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
        }).catch(error => {
            return error.response.data.errors;
        })
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

    getAllCategories(page, limit, filters = {}, idCategory = null) {

        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&q=' + filters.searchQuery : '';
        let filterQuery = searchQuery;

        let byIdCategory = idCategory ? {params: {parent: idCategory}} : ''

        return Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&sort_field=_id&sort_type=desc`, byIdCategory).then((response) => {
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
            return error.response.data.errors;
        })
    },
};
