import { getAccount, editAccount } from './api/AccountAPI.js';

const userID = document.getElementById("accountID");
const userName = document.getElementById("accountName");
const userPhone = document.getElementById("accountPhone");
const userAddress = document.getElementById("accountAdress");

document.addEventListener("DOMContentLoaded", function () {
    const cancelBtn = document.querySelector(".account-cancel-button");
    if(cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            window.location.href = "/quantri/taikhoan";
        });
    }

    const saveBtn = document.querySelector(".account-save-button");
    if(saveBtn) {
        saveBtn.addEventListener("click", changeInfo);
    }

    loadAccount();
});

async function loadAccount() {
    const urlParts = window.location.pathname.split('/');
    const accountID = urlParts[urlParts.length - 1];

    const response = await getAccount(accountID);
    if (response.success) {
        const accountData = response.data;

        userID.value = accountData.userID;
        userName.value = accountData.userName;
        userPhone.value = accountData.userPhone;
        userAddress.value = accountData.userAddress;
    } else if (response === "401") {

    }
}

async function changeInfo() {
    const accountID = userID.value;
    const accountName = userName.value;
    const accountPhone = userPhone.value;
    const accountAddress = userAddress.value;

    const account = {
        userID: accountID,
        userName: accountName,
        userPhone: accountPhone,
        userAddress: accountAddress
    };

    const response = await editAccount(account);
    if (response.success) {
        window.location.href = "/quantri/taikhoan";
    } else if (response === "500") {
        alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
    }
}