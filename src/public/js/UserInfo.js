import { getCurrentAccount, editAccount } from './api/AccountAPI.js';


document.addEventListener("DOMContentLoaded", function () {
    loadAccount();

    const saveBtn = document.getElementById("saveBtn");
    if(saveBtn) {
        saveBtn.addEventListener("click", changeInfo);
    }
});

async function loadAccount() {
    const response = await getCurrentAccount();
    if (response.success) {
        const accountData = response.data;
        document.getElementById("hoten").value = accountData.userName;
        document.getElementById("sdt").value = accountData.userPhone;
        document.getElementById("diachi").value = accountData.userAddress;
    } else if (response === "401") {
        window.location.href = "/dangnhap";
    }
}

async function changeInfo() {
    const userName = document.getElementById("hoten").value;
    const userPhone = document.getElementById("sdt").value;
    const userAddress = document.getElementById("diachi").value;

    const account = {
        userName: userName,
        userPhone: userPhone,
        userAddress: userAddress
    };

    const response = await editAccount(account);
    if (response.success) {
        loadAccount();
    } else if (response === "500") {
        alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
    }
}