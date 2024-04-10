import { login } from './AccountAPI.js';

document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");

    if(loginButton) {
        loginButton.addEventListener("click", loginEvent);
    }
});

async function loginEvent() {
    const userID = document.getElementById("login-username").value;
    const userPassword = document.getElementById("login-password").value;

    const account = {
        userID: userID,
        userPassword: userPassword
    };

    const response = await login(account);
    if (response.success) {
        window.location.href = `/trangchu`;
    } else if (response === "404") {
        alert(`Tài khoản ${userID} không tồn tại`);
    } else if (response === "401") {
        alert("Tên đăng nhập hoặc mật khẩu không chỉnh xác");
    } else if (response === "500") {
        alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
    }
}