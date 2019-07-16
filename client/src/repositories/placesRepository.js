import Repository from "./Repository";

const resource = "/place/search";

export default {
    getPlace(id) {
        return Repository.get(`${resource}/${id}`).then(response => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },

    getAllPlaces(page, limit, filters = {}, idCategory = null) {
        let searchQuery =
            filters.searchQuery && filters.searchQuery !== ""
                ? "&q=" + filters.searchQuery
                : "";
        let filterQuery = searchQuery;

        return Repository.get(
            `${resource}?page=${page}&limit=${limit}${filterQuery}&sort_field=_id&sort_type=desc`
        ).then(response => {
            if (response.data.success) {
                return response.data;
            }
        });
    }
};
