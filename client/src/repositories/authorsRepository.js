import Repository from "./Repository";

const resource = "/author";

export default {
    async getAuthor(id) {
        const response = await Repository.get(`${resource}/${id}`);
        if (response.data.success) {
            return response.data.data;
        }
    },
    async updateAuthor(id, data) {
        try {
            const response = await Repository.put(`${resource}/${id}`, data);
            if (response.data.success) {
                return response.data;
            }
        }
        catch (error) {
            return error.response.data.errors;
        }
    },
    async deleteAuthor(id) {
        const response = await Repository.delete(`${resource}/${id}`);
        if (response.data.success) {
            return response.data;
        }
    },
    async deleteAuthors(ids) {
        const response = await Repository.patch(`${resource}/?operation=delete&ids=${ids}`);
        if (response.data.success) {
            return response.data;
        }
    },

    async getAllAuthors(page, limit, filters = {}) {

        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&q=' + filters.searchQuery : '';
        let filterQuery = searchQuery;


        const response = await Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&sort_field=_id&sort_type=desc`);
        if (response.data.success) {
            return response.data;
        }
    },

    async newAuthor(data) {
        try {
            const response = await Repository.post(`${resource}`, data);
            if (response.data.success) {
                return response.data;
            }
        }
        catch (error) {
            return error.response.data.errors;
        }
    },
};
