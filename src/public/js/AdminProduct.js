import { getBookList } from './BookAPI.js';
import { formatNumberToCurrency } from './Format.js';

document.addEventListener("DOMContentLoaded", async function () {
    let response = await getBookList();
    const productList = response.data;
    displayProduct(productList);
});

function displayProduct(productList) {
    const productWrapper = document.querySelector(".container-product-card");
    productList.forEach(book => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML =
            `<div class="product-image">
            <img src="${book.bookImage}" alt="Product 1">
        </div>
        <div class="product-details">
            <div>
                <span style="font-weight: bold;">Mã sản phẩm:</span>
                <span class="product-code">${book.bookID}</span>
            </div>
            <div>
                <span style="font-weight: bold;">Tên sản phẩm:</span>
                <span class="product-name">${book.bookName}</span>
            </div>
            <div>
                <span style="font-weight: bold;">Giá:</span>
                <span class="product-price">${formatNumberToCurrency(book.bookPrice)} đ</span>
            </div>
            <div class="product-actions">
                <a href="/quantri/sanpham/chinhsua/${book.bookID}">
                    <button class="btn btn-edit-product">Chỉnh sửa thông tin</button>
                </a>
                <a href="/quantri/sanpham/${book.bookID}">
                    <button class=" btn btn-view-product">Xem chi tiết</button>
                </a>
            </div>
        </div>`;

        productWrapper.appendChild(productCard);
    });
}