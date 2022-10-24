import {axios} from "../config";

export default {
    getCart: (orderID) => axios.get(`/cart/user-cart/${orderID}`),
    addCart: (data) => axios.post("/cart/user-cart", data),
    changeCount: (url, data) => axios.post(url, data),
}