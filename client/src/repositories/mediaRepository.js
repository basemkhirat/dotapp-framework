import Repository from "./Repository";

const resource = "/media";

export default {
    getMediaItem(id) {
        return Repository.get(`${resource}/${id}`).then(response => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },

    updateMedia(id, data) {
        return Repository.put(`${resource}/${id}`, data).then(response => {
            if (response.data.success) {
                return response.data;
            }
        });
    },

    deleteMedia(id) {
        return Repository.delete(`${resource}/${id}`).then(response => {
            if (response.data.success) {
                return response.data;
            }
        });
    },

    deleteItems(ids) {
        return Repository.patch(
            `${resource}/?operation=delete&ids=${ids}`
        ).then(response => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deleteItem(id) {
        return Repository.delete(`${resource}/${id}`).then(response => {
            if (response.data.success) {
                return response.data;
            }
        });
    },

    getAllMedia(page, limit, filters = {}) {
        // let typeQuery = ''
        // if(Array.isArray(filters.type)) {
        //     filters.type.map(item => {
        //         return typeQuery.push(`&type[]=${item}`)
        //     })
        // } else {
        //     typeQuery = (filters.type && filters.type !== '') ? '&type=' + filters.type : '';
        // }
        let typeQuery =
            filters.type && filters.type !== "" ? "&type=" + filters.type : "";

        let orderQuery = filters.order ? "&sort_type=" + filters.order : "";
        let searchQuery =
            filters.searchQuery && filters.searchQuery !== ""
                ? "&q=" + filters.searchQuery + "&fieldsNames=title"
                : "";

        let filterQuery = typeQuery + orderQuery + searchQuery;

        return Repository.get(
            `${resource}?page=${page}&limit=${limit}${filterQuery}`
        ).then(response => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    newMediaItem(data) {
        return Repository.post(`${resource}`, data)
            .then(response => {
                if (response.data.success) {
                    return response.data;
                }
            })
            .catch(error => {
                return error.response.data;
            });
    },
    // Get All Type
    getMediaType() {
        return Repository.get(`${resource}/types`).then(response => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    // Get All Thumbnails
    getMediaThumbnails() {
        return Repository.get(`${resource}/thumbnails`).then(response => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    // Set All Thumbnails
    setMediaThumbnails(id, data) {
        return Repository.put(`${resource}/thumbnail/${id}`, data).then(
            response => {
                if (response.data.success) {
                    return response.data;
                }
            }
        );
    }
};
