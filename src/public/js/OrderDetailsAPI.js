import {apiRequest} from './ApiRequest.js';

async function getOrderDetails() {
    const urlParts = window.location.pathname.split('/');
    const orderID = urlParts[urlParts.length - 1];

    const response = await apiRequest("GET", `/order-detail/${orderID}`);
    return response;
}

async function createOrder(orderDetails) {
    const response = await apiRequest('POST', '/order-detail/', orderDetails);
    return response;
}

export { getOrderDetails, createOrder };
