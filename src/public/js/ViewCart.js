import { getBook } from './BookAPI.js';
import { formatNumberToCurrency } from './Format.js';

document.addEventListener("DOMContentLoaded", function () {
    const cartEmpty = document.getElementById("container-cart-empty");
    const cartBody = document.getElementById("cart-body");
    const cartJSON = localStorage.getItem("cart");

    if (cartJSON != null) {
        const cart = JSON.parse(cartJSON);
        if (cart.length != 0) {
            cartBody.style.display = "flex";
            cartEmpty.style.display = "none";
            viewCart(cart);
        } else {
            goShopping(cartBody, cartEmpty)
        }
    } else {
        goShopping(cartBody, cartEmpty)
    }
});

function goShopping(cartBody, cartEmpty) {
    const btnShoping = document.getElementById("shopping-now");
    btnShoping.addEventListener("click", () => {
        window.location.href = '/danhsach'
    })
    cartBody.style.display = "none";
    cartEmpty.style.display = "block";
}

function viewCart(cart) {
    let productPrice = 0;

    const cartContainer = document.getElementById("cart-container");
    const cartDiv = cartContainer.getElementsByClassName("product-cart-item");

    Array.from(cartDiv).forEach(item => {
        cartContainer.removeChild(item);
    });

    cart.forEach(async (cartItem) => {
        const response = await getBook(cartItem.bookID);
        const bookData = response.data;

        // Tạo thẻ div cho mỗi sản phẩm
        let productDiv = document.createElement("div");
        productDiv.className = "product-cart-item";
        productDiv.id = bookData.bookID;

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        productDiv.appendChild(checkBox);

        // Tạo thẻ img cho hình ảnh sản phẩm
        let imgElement = document.createElement("img");
        imgElement.className = "product-image";
        imgElement.src = bookData.bookImage;
        imgElement.alt = "Product Image";
        productDiv.appendChild(imgElement);

        // Tạo thẻ div cho chi tiết sản phẩm
        let detailsDiv = document.createElement("div");
        detailsDiv.className = "product-details";

        // Tạo thẻ h3 cho tên sản phẩm
        let h3Element = document.createElement("h3");
        h3Element.textContent = bookData.bookName;

        detailsDiv.appendChild(h3Element);

        // Tạo thẻ p cho giá sản phẩm
        let bookPrice = bookData.bookPrice;
        let pElement = document.createElement("p");
        pElement.className = "product-price-cart";
        pElement.textContent = `${formatNumberToCurrency(bookPrice)} ₫`;

        detailsDiv.appendChild(pElement);

        // Thêm div chi tiết vào sản phẩm
        productDiv.appendChild(detailsDiv);

        // Tạo thẻ div cho số lượng sản phẩm
        let quantityDiv = document.createElement("div");
        quantityDiv.className = "quantity";

        // Tạo input cho số lượng
        let quantity = cartItem.quantity;
        let quantityInput = document.createElement("input");
        quantityInput.className = "product-info-quantity-input"
        quantityInput.type = "number";
        quantityInput.value = Number(quantity);
        quantityInput.min = 1;
        quantityInput.max = bookData.bookStock;
        quantityInput.addEventListener('change', function () {
            let newQuantity = Number(this.value);
            let max = Number(this.max);

            if (newQuantity >= 1 && newQuantity <= max) {
                this.value = newQuantity;
            } else if (newQuantity >= max) {
                alert("Đã vượt số lượng tối đa");
                this.value = max;

            } else if (newQuantity <= 1) {
                this.value = 1;
            }
            updateQuantityInLocalStorage(bookData, this.value);
        });
        quantityDiv.appendChild(quantityInput);

        productPrice = Number(productPrice) + Number(bookPrice * quantity);

        // Thêm div số lượng vào sản phẩm
        productDiv.appendChild(quantityDiv);

        // Tạo thẻ div cho tổng giá trị sản phẩm
        let totalDiv = document.createElement("div");
        totalDiv.className = "product-total";
        let tongTien = Number(bookPrice * quantity);
        
        totalDiv.textContent = `${formatNumberToCurrency(tongTien)} ₫`;
        productDiv.appendChild(totalDiv);

        // Tạo thẻ div cho nút xóa sản phẩm
        let removeDiv = document.createElement("button");
        removeDiv.className = "remove-btn";
        removeDiv.addEventListener('click', function () {
            // Lấy ID từ ID của thẻ sản phẩm
            let bookIdToRemove = productDiv.id;

            // Gọi hàm xóa sách từ giỏ hàng
            removeBookFromLocalStorage(bookIdToRemove);
        });
        removeDiv.innerHTML = '<i class="fa-solid fa-trash"></i>';
        productDiv.appendChild(removeDiv);

        // Thêm sản phẩm vào container
        cartContainer.appendChild(productDiv);
        totalPrice(productPrice);
    });
}

function totalPrice(productPrice) {
    let divThanhTien = document.getElementById("thanhTien");
    divThanhTien.innerText = `${formatNumberToCurrency(productPrice)} ₫`;

    let divTotal = document.getElementById("total");
    divTotal.innerText = `${formatNumberToCurrency(productPrice)} ₫`;
}

function deleteAllCart() {
    localStorage.removeItem("cart");
    location.reload(true);
}

function removeBookFromLocalStorage(bookId) {
    // Lấy danh sách sách từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tìm vị trí của sách trong danh sách
    let indexToRemove = cart.findIndex(item => item.ID === bookId);

    // Nếu tìm thấy, xóa sách khỏi danh sách
    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);

        // Lưu danh sách mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(true);
    }
}

function updateQuantityInLocalStorage(book, newQuantity) {
    // Lấy danh sách sản phẩm từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tìm sản phẩm cần chỉnh sửa trong danh sách
    let productToUpdate = cart.find(cartItem => cartItem.bookID === book.bookID);

    // Nếu sản phẩm được tìm thấy, cập nhật số lượng
    if (productToUpdate) {
        productToUpdate.quantity = newQuantity;

        // Lưu danh sách mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        viewCart(cart);
    }
}

function checkTotal(clickedButton) {
    const cartContainer = document.getElementById("cart-container");
    const cartDiv = cartContainer.getElementsByClassName("product-cart-item");

    Array.from(cartDiv).forEach(item => {
        item.children[0].checked = clickedButton.checked;
    });
}