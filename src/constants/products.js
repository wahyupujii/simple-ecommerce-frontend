import {axios} from "../config";

export default {
    getAll: () => axios.get("/products"),
    getOne: (id) => axios.get(`/products/${id}`),
}