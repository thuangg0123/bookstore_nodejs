import { apiRequest } from './ApiRequest.js';

async function getBookList() {
    let response = await apiRequest("GET", "/book/");
    return response;
}

async function getBook(bookID) {
    const response = await apiRequest("GET", `/book/${bookID}`);
    return response;
}

async function addBook(book) {
    const response = await apiRequest('POST', '/book/', book);
    return response;
}

async function editBook(book) {
    const urlParts = window.location.pathname.split('/');
    const bookID = urlParts[urlParts.length - 1];

    const response = await apiRequest('PUT', `/book/${bookID}`, book);
    return response;
}

async function deleteBook() {
    const urlParts = window.location.pathname.split('/');
    const bookID = urlParts[urlParts.length - 1];

    const response = await apiRequest("DELETE", `/book/${bookID}`);
    return response;
}

async function uploadImage(_id, image) {
    const response = await apiRequest("PUT", `/book/upload-image/${_id}`, image);
    return response;
}

async function searchBooks(query) {
    const response = await apiRequest("GET", `/book/search-books?query=${query}`);
    return response;
}

export { getBookList, getBook, addBook, editBook, deleteBook, uploadImage, searchBooks };
