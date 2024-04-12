import { getOrderList } from './api/OrderAPI.js';
import { formatNumberToCurrency, formatDate, formatOrderStatus } from './Formatter.js';

document.addEventListener("DOMContentLoaded", async function () {
    const response = await getOrderList();
    if (response.success) {
        const orderData = response.data;
        displayOrder(orderData);
    }
});

function displayOrder(orderData) {
    const orderList = document.getElementById("orderList");
    orderData.forEach(order => {
        let orderItemQuantityP;

        const orderItemQuantity = order.orderItemQuantity - 1;
        if (orderItemQuantity != 0) {
            orderItemQuantityP = `<p>Và ${orderItemQuantity} cuốn sách khác</p>`
        }

        const orderItem = document.createElement("div");
        orderItem.className = "order-item";
        orderItem.innerHTML =
            `<div class="order-header">
                    <span class="order-id">Mã đơn hàng: ${order.orderID}</span>
                    <span class="order-state">Tình trạng: ${formatOrderStatus(order.orderStatus)}</span>
                    <div class="header-right">
                        <span class="order-date">Ngày đặt: ${formatDate(order.orderTime)}</span>
                    </div>
                </div>
                <div class="order-details">
                    <div class="product-info" style="flex-direction: row;">
                        <img src="${order.orderFirstBook.bookImage}" alt="Product Image">
                        <div class="product-description">
                            <div>
                                <h3>${order.orderFirstBook.bookName}</h3>
                                ${orderItemQuantityP !== undefined ? orderItemQuantityP : ''}
                            </div>
                            <p>${formatNumberToCurrency(order.orderTotal + 25000)} đ</p>
                        </div>
                    </div>
                </div>
                <a href=/taikhoan/donhang/${order.orderID}><button class="view-detail">Xem chi tiết đơn hàng</button></a>`

        orderList.appendChild(orderItem);
    });
}