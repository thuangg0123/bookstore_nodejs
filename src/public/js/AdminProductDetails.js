import { getBook, deleteBook } from './BookAPI.js';
import { formatNumberToCurrency } from './Format.js';

document.addEventListener("DOMContentLoaded", async function () {
    const urlParts = window.location.pathname.split('/');
    const bookID = urlParts[urlParts.length - 1];

    const response = await getBook(bookID);
    const bookData = response.data;
    if (bookData.length !== 0) {
        displayBookDetails(bookData);
    }
});

function displayBookDetails(book) {
    const productWrapper = document.getElementById("content");
    const productDetail = document.createElement("div");
    productDetail.className = "productDetailContent_product-container";
    productDetail.innerHTML =
        `<div class="productDetailContent_product-image">
                <img src="${book.bookImage}" alt="Product 1">
            </div>
            <div class="productDetailContent_product-details">
                <div>
                    <span style="font-weight: bold;">Mã sản phẩm: </span>
                    <span class="productDetailContent_product-code">${book.bookID}</span>
                </div>
                <div>
                    <span style="font-weight: bold;">Tên sản phẩm: </span>
                    <span class="productDetailContent_product-name">${book.bookName}</span>
                </div>
                <div>
                    <span style="font-weight: bold;">Giá: </span>
                    <span class="productDetailContent_product-price">${formatNumberToCurrency(book.bookPrice)} đ</span>
                </div>
                <div class="productDetailContent_product-info">
                    <div class="productDetailContent_product-desc">
                        <div>
                            <span class="detail-label author">Tác giả: </span>
                            <span>${book.bookAuthor}</span>
                        </div>
                        <div>
                            <span class="detail-label supplier">Nhà xuất bản: </span>
                            <span>${book.bookPublisher}</span>
                        </div>
                        <div>
                            <span class="detail-label weight">Trọng lượng: </span>
                            <span>${book.bookWeight} gr</span>
                        </div>
                        <div>
                            <span class="detail-label size">Kích thước: </span>
                            <span>${book.bookSize} cm</span>
                        </div>
                        <div>
                            <span class="detail-label size">Số sách tồn kho: </span>
                            <span>${book.bookStock}</span>
                        </div>
                        <div>
                            <span class="detail-label size">Số sách đã bán: </span>
                            <span>${book.bookSold}</span>
                        </div>
                        <div>
                            <span class="detail-label introduce">Giới thiệu:</span>
                            <span>${book.bookIntroduction}</span>
                        </div>
                    </div>
                </div>
                <div class="product-actions" style="justify-content: flex-start;">
                    <a href="/quantri/sanpham/chinhsua/${book.bookID}">
                        <button class="btn btn-edit-product" onclick="">Chỉnh sửa thông tin</button>
                    </a>
                    <button class="btn btn-delete-product" id="btn-delete-product" onclick="deleteProduct()">Xóa</button>
                </div>
            </div>`;

    productWrapper.appendChild(productDetail);
};


async function deleteProduct() {
    const urlParts = window.location.pathname.split('/');
    const bookID = urlParts[urlParts.length - 1];

    if (confirm(`Bạn muốn xóa sản phẩm ${bookID}?`) == true) {
        const response = await deleteBook(bookID);
        if (response.success) {
            alert(`Xóa sản phẩm ${bookID} thành công`);
            window.location.href = "/quantri/sanpham";
        } else if (response === "500") {
            alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
        }
    }
}