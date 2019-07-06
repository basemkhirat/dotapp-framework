import Repository from "./Repository";

const resource = "/block";

export default {
    async getBlock(slug) {
        const response = await Repository.get(`${resource}/slug/${slug}`);
        if (response.data.success) {
            return response.data.data;
        }
    },

    async updateBlock(id, data) {
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

    async getAllBlocks(page, limit, filters = {}) {
        let searchQuery =
            filters.searchQuery && filters.searchQuery !== ""
                ? "&q=" + filters.searchQuery
                : "";
        let filterQuery = searchQuery;

        const response = await Repository.get(
            `${resource}?page=${page}&limit=${limit}${filterQuery}&sort_field=_id&sort_type=desc`
        );
        if (response.data.success) {
            return response.data;
        }
    },

    async newBlock(data) {
        try {
            const response = await Repository.post(`${resource}`, data);
            if (response.data.success) {
                return response.data;
            }
        }
        catch (error) {
            return error.response.data.errors;
        }
    }
};
