// var accountSection = document.getElementById('accountSection');
// var userOptionsSection = document.getElementById('userOptionsSection');

// function showLoggedInView() {
//     accountSection.style.display = 'block';
//     userOptionsSection.style.display = 'none';
// }

// function showLoggedOutView() {
//     accountSection.style.display = 'none';
//     userOptionsSection.style.display = 'block';
// }

// function validateLoginForm() {
//     var username = document.getElementById('login-username').value;
//     var password = document.getElementById('login-password').value;

//     var storedAccounts = localStorage.getItem('sampleAccounts');
//     var sampleAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];

//     if (!username || !password) {
//         alert('Vui lòng nhập cả tên đăng nhập và mật khẩu.');
//         return false;
//     }

//     var account = sampleAccounts.find(function (acc) {
//         return acc.username === username;
//     });

//     if (!account) {
//         alert('Tài khoản không tồn tại.');
//         return false;
//     }

//     if (account.password !== password) {
//         alert('Mật khẩu không chính xác.');
//         return false;
//     }

//     alert("Đăng nhập thành công")
//     localStorage.setItem('isLoggedIn', 'true');

//     if (localStorage.getItem('isLoggedIn') === 'true') {
//         window.location.href = 'trangchu.html';
//     }

//     return false;
// }


// function validateRegisterForm() {
//     var email = document.getElementById('register-email').value;
//     var username = document.getElementById('register-username').value;
//     var password = document.getElementById('register-password').value;
//     var confirmPassword = document.getElementById('confirm-password').value;

//     var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (username.length < 8) {
//         alert('Tên đăng nhập phải có ít nhất 8 ký tự.');
//         return false;
//     }

//     if (!emailRegex.test(email)) {
//         alert('Email không đúng định dạng.');
//         return false;
//     }

//     if (!passwordRegex.test(password)) {
//         alert('Mật khẩu phải có ít nhất 8 ký tự với số, chữ cái và ký tự.');
//         return false;
//     }

//     if (password !== confirmPassword) {
//         alert('Mật khẩu nhập lại không khớp.');
//         return false;
//     }

//     //acc test

//     var sampleAccounts = [
//         { username: 'trangchu', password: 'trangchu' },
//     ];
//     localStorage.setItem('sampleAccounts', JSON.stringify(sampleAccounts));

//     alert('Đăng kí thành công!');
//     window.location.href = 'trangchu.html';
//     event.preventDefault();
//     return true;
// }

// var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// if (isLoggedIn) {
//     showLoggedInView();
// }
// else {
//     showLoggedOutView();
// }

// document.getElementById('btnLogout').addEventListener('click', function () {
//     // Xử lý khi nút "Đăng xuất" được nhấn
//     localStorage.setItem('isLoggedIn', 'false'); // Đặt trạng thái đăng nhập về false

//     // Cập nhật giao diện sau khi đăng xuất
//     showLoggedOutView();
//     alert('Đăng xuất thành công!');
// });

// // checkout

// document.addEventListener("DOMContentLoaded", function () {
//     var form = document.getElementById("checkout-form");

//     form.addEventListener("submit", function (event) {
//         event.preventDefault();
//         var isValid = true;

//         var nameInput = document.getElementById("name");
//         if (!nameInput.value.trim()) {
//             alert("Vui lòng nhập họ và tên người nhận.");
//             isValid = false;
//         }

//         var emailInput = document.getElementById("email");
//         var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(emailInput.value.trim())) {
//             alert("Email không đúng định dạng.");
//             isValid = false;
//         }

//         var phoneInput = document.getElementById("phone");
//         var phoneRegex = /^[0-9]{10}$/;
//         if (!phoneRegex.test(phoneInput.value.trim())) {
//             alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 ký tự số.");
//             isValid = false;
//         }

//         var provinceInput = document.getElementById("province");
//         if (!provinceInput.value) {
//             alert("Vui lòng chọn Tỉnh/Thành phố.");
//             isValid = false;
//         }

//         var districtInput = document.getElementById("district");
//         if (!districtInput.value) {
//             alert("Vui lòng chọn Quận/Huyện.");
//             isValid = false;
//         }

//         var wardInput = document.getElementById("ward");
//         if (!wardInput.value) {
//             alert("Vui lòng chọn Phường/Xã.");
//             isValid = false;
//         }

//         var addressInput = document.getElementById("address");
//         if (!addressInput.value.trim()) {
//             alert("Vui lòng nhập địa chỉ nhận hàng.");
//             isValid = false;
//         }

//         if (isValid) {
//             alert("Đặt hàng thành công!");
//             cleaForm()
//             window.location.href = 'khachhang_taikhoan.html'
//         }
//     });

//     const cleaForm = () => {
//         form.reset();
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     var btndeleteSelected = document.getElementById("deleteSelected");
//     var removeBtn = document.querySelector('.remove-btn');

//     removeBtn.addEventListener('click', function () {
//         var confirmDelete = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');

//         if (confirmDelete) {
//             alert('Sản phẩm đã được xóa.');
//         } else {
//             alert('Hủy xóa sản phẩm.');
//         }
//     });

//     btndeleteSelected.addEventListener('click', function () {
//         var confirmDelete = confirm('Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng không?');

//         if (confirmDelete) {
//             alert('Giỏ hàng đã trống.');
//         } else {
//             alert('Hủy xóa sản phẩm.');
//         }
//     });
// });
