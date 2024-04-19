import { getCurrentAccount, editAccount } from './api/AccountAPI.js';
import { createOrder } from './api/OrderAPI.js';
import { createOrderDetails } from './api/OrderDetailsAPI.js';
import { getBook } from './api/BookAPI.js';

document.addEventListener("DOMContentLoaded", function () {
    loadAccount();
    getCart();

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", checkout);
    }
});

async function loadAccount() {
    const response = await getCurrentAccount();
    if (response.success) {
        const accountData = response.data;

        document.getElementById("name").value = accountData.userName;
        document.getElementById("phone").value = accountData.userPhone;
        document.getElementById("address").value = accountData.userAddress;
    } else if (response === "401") {
        window.location.href = "/dangnhap";
    }
}

async function checkout() {
    const response = await getCurrentAccount();
    if (response.success) {
        const accountData = response.data;
        if (accountData.isAdmin) {
            alert("Vui lòng không dùng tài khoản quản trị để đặt hàng");
            return;
        }
    }

    let productPriceString = document.getElementById('divThanhTien').innerText;
    productPriceString = productPriceString.replace(/[.,₫]/g, '');
    const productPrice = parseInt(productPriceString);

    const name = document.getElementById("name").value;
    if (!name) {
        alert("Vui lòng nhập tên người nhận để đặt hàng");
        return;
    }

    const phone = document.getElementById("phone").value;
    if (!phone) {
        alert("Vui lòng nhập số điện thoại để đặt hàng");
        return;
    }

    const address = document.getElementById("address").value;
    if (!address) {
        alert("Vui lòng nhập địa chỉ để đặt hàng");
        return;
    }

    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    const cartJSON = localStorage.getItem("cart");
    const cart = JSON.parse(cartJSON);
    const orderItemQuantity = cart.length;

    const order = {
        "orderFirstBook": cart[0].bookID,
        "orderTotal": productPrice,
        "orderItemQuantity": orderItemQuantity,
        "orderPhone": phone,
        "orderAddress": address,
        "orderStatus": paymentMethod
    }

    const orderResponse = await createOrder(order);
    if (orderResponse.success) {
        const orderDetails = {
            "orderID": orderResponse.data._id,
            "orderItem": cart
        }

        const detailResponse = await createOrderDetails(orderDetails);
        if (detailResponse.success) {
            changeInfo();
            localStorage.removeItem("cart")
            window.location.href = `/taikhoan/donhang/${orderResponse.data.orderID}`;
        } else if (detailResponse === "500") {
            alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
        }

    } else if (orderResponse === "500") {
        alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
    }
}

async function changeInfo() {
    const userName = document.getElementById("name").value;
    const userPhone = document.getElementById("phone").value;
    const userAddress = document.getElementById("address").value;

    const account = {
        userName: userName,
        userPhone: userPhone,
        userAddress: userAddress
    };

    await editAccount(account);
}

function getCart() {
    const cartJSON = localStorage.getItem("cart");

    if (cartJSON != null) {
        var cart = JSON.parse(cartJSON);
        checkItem(cart);
    }
}

function checkItem(cart) {
    let thanhTien = 0;
    const container = document.getElementById("checkout-product");
    cart.forEach(async function (cartItem) {
        const response = await getBook(cartItem.bookID);
        const bookData = response.data;

        const giaInt = bookData.bookPrice;
        const soLuong = Number(cartItem.quantity);
        const totalNumber = Number(giaInt) * Number(soLuong);
        thanhTien = Number(thanhTien) + Number(totalNumber);

        // Create table element
        const table = document.createElement('table');
        table.className = 'checkout-product-item';
        table.id = bookData.bookID;

        // Create table row element
        const row = document.createElement('tr');

        // Create table cell for image
        const imgCell = document.createElement('td');
        imgCell.className = 'checkout-product-item-img';
        const img = document.createElement('img');
        img.src = bookData.bookImage;
        img.alt = '';
        imgCell.appendChild(img);
        row.appendChild(imgCell);

        // Create table cell for product detail
        const detailCell = document.createElement('td');
        detailCell.className = 'checkout-product-item-detail';
        detailCell.style.width = "300px"
        const productName = document.createElement('div');
        productName.className = 'checkout-product-item-name';
        productName.textContent = bookData.bookName;
        detailCell.appendChild(productName);
        row.appendChild(detailCell);

        // Create table cell for product price
        const priceCell = document.createElement('td');
        priceCell.className = 'checkout-product-item-price';
        priceCell.textContent = convertNumberToCurrency(giaInt);
        row.appendChild(priceCell);

        // Create table cell for product quantity
        const qtyCell = document.createElement('td');
        qtyCell.className = 'checkout-product-item-qty';
        const qtySpan = document.createElement('span');
        qtySpan.textContent = soLuong;
        qtyCell.appendChild(qtySpan);
        row.appendChild(qtyCell);

        // Create table cell for total price
        const totalCell = document.createElement('td');
        totalCell.className = 'checkout-product-item-total';
        totalCell.textContent = convertNumberToCurrency(totalNumber);
        row.appendChild(totalCell);

        // Add the row to the table
        table.appendChild(row);

        container.appendChild(table);

        totalPrice(thanhTien)
    });
}

function totalPrice(thanhTien) {
    const divThanhTien = document.getElementById("divThanhTien");
    const divTotal = document.getElementById("divTotal");
    divThanhTien.innerText = convertNumberToCurrency(thanhTien);
    divTotal.innerText = convertNumberToCurrency(thanhTien + 25000);
}

function convertCurrencyToNumber(currencyString) {
    // Xóa ký tự '₫' và dấu phẩy (nếu có)
    const cleanedString = currencyString.replace('₫', '').replace('.', '');

    // Chuyển đổi thành số nguyên
    const convertedNumber = parseInt(cleanedString);
    return convertedNumber;
}

function convertNumberToCurrency(number) {
    // Định dạng số và thêm ký tự '₫'
    const formattedCurrency = number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return formattedCurrency;
}