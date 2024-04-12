import { register } from './api/AccountAPI.js';

document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("registerButton");

    if (registerButton) {
        registerButton.addEventListener("click", registerEvent);
    }
});

async function registerEvent() {
    const userID = document.getElementById("register-username").value;
    const userPassword = document.getElementById("register-password").value;
    const userConfirmPassword = document.getElementById("confirm-password").value;

    if (userPassword !== userConfirmPassword) {
        alert("Vui lòng xác nhận lại mật khẩu");
        return;
    }

    const account = {
        userID: userID,
        userPassword: userPassword
    };

    const response = await register(account);

    if (response.success) {
        alert("Đăng kí thành công");
        window.location.href = "/trangchu";
    } else if (response === "400") {
        alert(`Tài khoản ${userID} đã tồn tại`);
    } else if (response === "500") {
        alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
    }
}