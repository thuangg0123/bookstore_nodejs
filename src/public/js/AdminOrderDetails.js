import { getOrderDetails } from './api/OrderDetailsAPI.js';
import { formatNumberToCurrency, formatOrderStatus } from './Format.js';

document.addEventListener("DOMContentLoaded", async function () {
    const urlParts = window.location.pathname.split('/');
    const orderID = urlParts[urlParts.length - 1];

    const response = await getOrderDetails(orderID);
    if (response.success) {
        const orderData = response.data;
        displayOrderDetails(orderData);
    }
});

function displayOrderDetails(orderData) {
    const order = orderData.orderID;
    const user = order.userID;

    if(user) {
        document.getElementById('userName').innerText = user.userName;
        document.getElementById('userPhone').innerText = user.userPhone;
        document.getElementById('userAddress').innerText = user.userAddress;
    }

    document.getElementById('order-id').innerText = `Mã đơn hàng: ${order.orderID}`;
    document.getElementById('order-state').innerText = formatOrderStatus(order.orderStatus);

    const orderItemList = orderData.orderItem;
    const orderProductList = document.getElementById('order-product-info');
    orderItemList.forEach(orderItem => {
        const book = orderItem.bookID;
        const orderItemDiv = document.createElement("div");
        orderItemDiv.className = "order-product-info-item";
        orderItemDiv.innerHTML =
            `<img src="${book.bookImage}" alt="Product Image">
                <div class="order-product-info-description">
                    <h3>${book.bookName}</h3>
                    <p>Số lượng: ${orderItem.quantity}</p>
                    <p>Giá: ${formatNumberToCurrency(book.bookPrice)}</p>
                </div>`;

        orderProductList.appendChild(orderItemDiv);
    });

    document.getElementById('productPrice').innerText = `${formatNumberToCurrency(order.orderTotal)} đ`;
    document.getElementById('totalPrice').innerText = `${formatNumberToCurrency(order.orderTotal + 25000)} đ`;
}