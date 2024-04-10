import { getBookList } from './BookAPI.js';
import { formatNumber } from './format.js';

document.addEventListener("DOMContentLoaded", async function () {
    let response = await getBookList();
    const productList = response.data;
    displayProduct(productList);
});

function displayProduct(productList) {
    const productWrapper = document.getElementById("productWrapper");
    productList.forEach(product => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.innerHTML =
            `<div class="product-img">
                    <a href="/danhsach/sach/${product.bookID}">
                        <img src="${product.bookImage}" alt="">
                    </a>
                </div>
                <h3 class="product-name">
                    <a href="danhsach/sach/${product.bookID}">${product.bookName}</a>
                </h3>
                <div class="product-price">
                    <p><span>${formatNumber(product.bookPrice)} đ</span></p>
                </div>
                <div class="product-sold">
                    <p>Đã bán <span>${product.bookSold}</span></p>
                </div>`;

        productWrapper.appendChild(productItem);
    });
}