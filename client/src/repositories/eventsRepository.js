import Repository from "./Repository";

const resource = "/event";

export default {
    newEvent(data) {
        return Repository.post(`${resource}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data.errors;
        })
    },
    getEvent(id) {
        return Repository.get(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    updateEvent(id, data) {
        return Repository.put(`${resource}/${id}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data.errors;
        })
    },
    deleteEvent(id) {
        return Repository.delete(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deleteEvents(ids) {
        return Repository.patch(`${resource}/?operation=delete&ids=${ids}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    getAllEvents(page, limit, filters = {}) {
        let statusQuery = (filters.status && filters.status !== '') ? '&status=' + filters.status : '';
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&q=' + filters.searchQuery : '';
        let orderQuery = filters.order ? "&sort_type=" + filters.order : "";
        let formatQuery = filters.format ? "&format=" + filters.format : "";
        // let categoriesQuery = filters.categories ? "&categories=" + filters.categories : "";

        let categoriesQuery = '';

        if (filters.categories) {
            filters.categories.map(categoryId => {
                categoriesQuery += '&categories[]=' + categoryId;
            });
        }

        let dateFromQuery = filters.dateFrom ? "&from_date=" + filters.dateFrom : "";
        let dateToQuery = filters.dateTo ? "&to_date=" + filters.dateTo : "";

        let filterQuery = searchQuery + statusQuery + orderQuery + formatQuery + dateFromQuery + dateToQuery + categoriesQuery;

        return Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&sort_field=_id`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },

};
