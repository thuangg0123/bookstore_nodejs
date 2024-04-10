import { getBook } from './BookAPI.js';
import { formatNumber } from './format.js';

document.addEventListener("DOMContentLoaded", async function () {
    const urlParts = window.location.pathname.split('/');
    const bookID = urlParts[urlParts.length - 1];

    const response = await getBook(bookID);
    const bookData = response.data;
    
    displayBookDetails(bookData);
});

function displayBookDetails(book) {
    document.querySelector(".director").lastElementChild.innerHTML = book.bookName;
    document.getElementById('productName').innerText = book.bookName;
    document.getElementById('productPrice').innerText = formatNumber(book.bookPrice) + ' đ';
    document.getElementById('productID').innerText = book.bookID;
    document.getElementById('productImgThumb').setAttribute('src', book.bookImage);
    document.getElementById('productImgSmall').setAttribute('src', book.bookImage);
    document.querySelector('.product-info-author span').innerText = book.bookAuthor;
    document.querySelector('.product-info-supplier span').innerText = book.bookPublisher;
    document.getElementById('product-info-author-td').innerText = book.bookAuthor;
    document.getElementById('product-info-supplier-td').innerText = book.bookPublisher;
    document.getElementById('product-info-weight-td').innerText = book.bookWeight + " gr";
    document.getElementById('product-info-size-td').innerText = book.bookSize + " cm";
    document.getElementById('product-info-introduce-td').innerText = book.bookIntroduction;

    document.getElementById('quantityInput').setAttribute('max', Number(book.bookStock));
}

document.getElementById("add-to-cart").addEventListener("click", () => {
    addToCart();
})