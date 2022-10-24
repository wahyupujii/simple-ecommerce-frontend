import {axios} from "../config";

export default {
    create: (data = {}) => axios.post("/orders", data),
    paid: () => axios.get("/orders/paid"),
    unpaid: () => axios.get("/orders/unpaid"),
    checkout: (data = {}) => axios.put("/orders/checkout", data),
    proofPayment: (data = {}) => axios.put("/orders/update-unpaid", data),
    delete: (data = {}) => axios.delete("/orders/delete", data)
}