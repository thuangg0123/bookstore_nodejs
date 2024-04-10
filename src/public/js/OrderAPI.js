import {apiRequest} from './ApiRequest.js';

async function getOrderList() {
    const response = await apiRequest("GET", "/order/");
    return response;
}

async function createOrder(order) {
    const response = await apiRequest('POST', '/order/', order);
    return response;
}

async function updateOrderStatus(orderID, order) {
    const response = await apiRequest('PUT', `/order/${orderID}`, order);
    return response;
}

export { getOrderList, updateOrderStatus, createOrder };
