import Repository from "./Repository";
import axios from "axios/index";

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
                return response.data.data;
            }
        });
    },
    deleteUser(id) {
        return Repository.delete(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
            console.log(response.data)
        });
    },
    getAllUsers(page, limit) {
        return Repository.get(`${resource}?page=${page}&limit=${limit}`).then((response) => {
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
