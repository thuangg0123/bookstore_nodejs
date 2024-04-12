import { getAccountList, deleteAccount } from './api/AccountAPI.js';

document.addEventListener("DOMContentLoaded", async function () {
    const response = await getAccountList();
    if (response.success) {
        const accountData = response.data;
        displayAccount(accountData);
    } else if (response === "500") {
        alert("Server hiện đang có vấn đề , vui lòng thử lại sau");
    }

    const deleteBtn = document.querySelectorAll(".btn-delete-account");
    deleteBtn.forEach(btn => {
        btn.addEventListener("click", deleteAccountEvent);
    })
});

async function displayAccount(accountData) {
    const accountList = document.getElementById("accountList");
    accountData.forEach(account => {
        const accountItem = document.createElement("div");
        accountItem.className = "account-card";
        accountItem.innerHTML =
            `<div class="account-details">
                <table>
                    <tr>
                        <td><span style="font-weight: bold;">ID:</span></td>
                        <td><span class="account-code">${account.userID}</span></td>
                    </tr>
                    <tr>
                        <td><span style="font-weight: bold;">Họ và tên:</span></td>
                        <td><span class="account-name">${account.userName}</span></td>
                    </tr>
                    <tr>
                        <td><span style="font-weight: bold;">Số điện thoại: </span></td>
                        <td><span class="account-remain">${account.userPhone}</span></td>
                    </tr>
                    <tr>
                        <td><span style="font-weight: bold;">Địa chỉ</span></td>
                        <td><span class="account-state">${account.userAddress}</span></td>
                    </tr>
                </table>
                <div class="account-actions">
                    <a href="/quantri/taikhoan/chinhsua/${account.userID}">
                        <button class="btn btn-edit-account">Chỉnh sửa thông tin</button>
                    </a>
                    <button class="btn btn-delete-account" id="${account.userID}">Xóa</button>
                </div>
            </div>`;

        accountList.appendChild(accountItem);
    });
}

async function deleteAccountEvent(event) {
    const clickedButton = event.currentTarget;
    const accountID = clickedButton.id;

    if (confirm(`Bạn muốn xóa tài khoản ${accountID}?`) == true) {
        const response = await deleteAccount(accountID);
        if (response.success) {
            alert(`Xóa tài khoản ${accountID} thành công`);
            window.location.reload();
        } else if (response === "500") {
            alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
        }
    }
}