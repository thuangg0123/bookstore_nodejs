import { getBook, editBook } from './api/BookAPI.js';
import { formatNumber, validateImageFile } from './CheckProduct.js';

const urlParts = window.location.pathname.split('/');
const bookID = urlParts[urlParts.length - 1];
const bookImage = document.getElementById("image");
const bookName = document.getElementById("name");
const bookPriceString = document.getElementById("price");
const bookAuthor = document.getElementById("author");
const bookPublisher = document.getElementById("publisher");
const bookWeight = document.getElementById("weight");
const bookSize = document.getElementById("size");
const bookStock = document.getElementById("stock");
const bookIntroduction = document.getElementById("introduction");

document.addEventListener("DOMContentLoaded", async function () {
    if (bookID) {
        const response = await getBook(bookID);
        const bookData = response.data;
        displayProductDetails(bookData);
    }

    const editBtn = document.querySelector(".add-button");
    if (editBtn) {
        editBtn.addEventListener("click", editBookEvent);
    }

    const cancelBtn = document.querySelector(".cancel-button");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            window.location.href = `/quantri/sanpham/${bookID}`;
        });
    }

    if (bookPriceString) {
        bookPriceString.addEventListener("input", () => formatNumber(bookPriceString));
    }

    if (bookImage) {
        bookImage.addEventListener("change", validateImageFile);
    }
});

function displayProductDetails(book) {
    bookName.value = book.bookName;
    bookPriceString.value = book.bookPrice;
    bookAuthor.value = book.bookAuthor;
    bookPublisher.value = book.bookPublisher;
    bookWeight.value = book.bookWeight;
    bookStock.value = book.bookStock;
    bookSize.value = book.bookSize;
    bookIntroduction.value = book.bookIntroduction;
}

async function editBookEvent() {
    const bookPrice = bookPriceString.value.replace(" ", "");

    const book = {
        bookName: bookName.value,
        bookPrice: bookPrice,
        bookAuthor: bookAuthor.value,
        bookPublisher: bookPublisher.value,
        bookWeight: bookWeight.value,
        bookSize: bookSize.value,
        bookStock: bookStock.value,
        bookIntroduction: bookIntroduction.value,
    };

    const response = await editBook(book);
    if (response.success) {
        window.location.href = `/quantri/sanpham/${bookID}`;
    } else if (response === "500") {
        alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
    }
}