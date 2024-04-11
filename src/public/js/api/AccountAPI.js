import { apiRequest } from '../ApiRequest.js';

async function login(account) {
    const response = await apiRequest('POST', '/account/login', account);
    return response;
}

async function register(account) {
    const response = await apiRequest('POST', '/account/register', account);
    return response;
}

async function logout() {
    const response = await apiRequest("POST", "/account/logout");
    return response;
}

async function getAccountList() {
    const response = await apiRequest("GET", `/account/`);
    return response;
}

async function getAccount() {
    const urlParts = window.location.pathname.split('/');
    const accountID = urlParts[urlParts.length - 1];

    const response = await apiRequest("GET", `/account/${accountID}`);
    return response;
}

async function getCurrentAccount() {
    const response = await apiRequest("GET", `/account/check/login`);
    return response;
}

async function editAccount(account) {
    const urlParts = window.location.pathname.split('/');
    const accountID = urlParts[urlParts.length - 1];

    const response = await apiRequest("PUT", `/account/${accountID}`, account);
    return response;
}

async function deleteAccount(accountID) {
    const response = await apiRequest("DELETE", `/account/${accountID}`);
    return response;
}

export { login, register, logout, getAccountList, getAccount, getCurrentAccount, editAccount, deleteAccount };
