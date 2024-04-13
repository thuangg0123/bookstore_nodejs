import { getOrderList, updateOrderStatus } from './api/OrderAPI.js';
import { formatNumberToCurrency, formatOrderStatus } from './Formatter.js';

document.addEventListener("DOMContentLoaded", async function () {
    const response = await getOrderList();
    if (response.success) {
        const orderData = response.data;
        displayOrder(orderData);
    }

    const updateBtn = document.querySelectorAll(".btn-edit-product");
    updateBtn.forEach(btn => {
        btn.addEventListener("click", openUpdateStatusModal);
    })

    const cancelBtn = document.querySelector(".btn-cancel");
    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", closeUpdateStatusModal);
    cancelBtn.addEventListener("click", closeUpdateStatusModal);

    const saveBtn = document.querySelector(".btn-save");
    saveBtn.addEventListener("click", updateOrderStatusEvent);
});

function openUpdateStatusModal(event) {
    const clickedButton = event.currentTarget;
    document.getElementById("ID").value = clickedButton.id;
    const updateStatusModal = document.getElementById('updateStatusModal')
    updateStatusModal.style.display = 'block';
}

function closeUpdateStatusModal() {
    document.getElementById('updateStatusModal').style.display = 'none';
}

async function updateOrderStatusEvent() {
    var orderStatus = document.getElementById("orderStatus").value;
    var orderID = document.getElementById("ID").value;

    const order = {
        orderStatus: orderStatus
    }

    const response = await updateOrderStatus(orderID, order);
    if (response.success) {
        window.location.reload();
    } else if (response === "500") {
        alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
    }
}

function displayOrder(orderData) {
    const orderList = document.getElementById("orderList");
    orderData.forEach(order => {
        if (order.userID) {
            let orderItemQuantityP;
            const orderItemQuantity = order.orderItemQuantity - 1;
            if (orderItemQuantity != 0) {
                orderItemQuantityP =
                    `<div>
                        <span class="order-name">Và ${orderItemQuantity} cuốn sách khác</span>
                    </div>`;
            }

            let orderStatusStyle;
            if (order.orderStatus >= 3) {
                orderStatusStyle = `style="opacity: 0.5;" disabled="disabled"`;
            }

            const orderItem = document.createElement("div");
            orderItem.className = "order-card";
            orderItem.innerHTML =
                `<div class="order-image">
                    <img src="${order.orderFirstBook.bookImage}" alt="Product img">
                </div>
                <div class="order-details">
                    <div>
                        <span style="font-weight: bold;">Mã đơn hàng:</span>
                        <span class="order-code">${order.orderID}</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Tên sản phẩm:</span>
                        <span class="order-name" ">${order.orderFirstBook.bookName}</span>
                    </div>
                    ${orderItemQuantityP !== undefined ? orderItemQuantityP : ''}
                    <div>
                        <span style="font-weight: bold;">Giá:</span>
                        <span class="order-price">${formatNumberToCurrency(order.orderTotal)} ₫</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Trạng thái đơn hàng:</span>
                        <span class="order-state">${formatOrderStatus(order.orderStatus)}</span>
                    </div>
                    <div class="order-actions">
                        <button class="btn btn-edit-product" id="${order.orderID}"
                        ${orderStatusStyle !== undefined ? orderStatusStyle : ''}>
                            Cập nhật trạng thái
                        </button>
                        <a href="/quantri/donhang/${order.orderID}">
                            <button class=" btn btn-view-order">Xem chi tiết</button>
                        </a>
                    </div>
                </div>`;

            orderList.appendChild(orderItem);
        }
    });
}