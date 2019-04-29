import Repository from "./Repository";
import axios from "axios/index";

const resource = "/user";

export default {
    getOne(id) {
        return Repository.get(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
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
        console.log(data)
        return Repository.post(`${resource}`, data).then((response) => {
            if (response.data.success) {
                return response.data.data;
            } 
        })
    },
};
