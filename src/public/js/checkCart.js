document.addEventListener("DOMContentLoaded", function () {
    var cartEmpty = document.getElementById("container-cart-empty");
    var cartBody = document.getElementById("cart-body");
    var cartJSON = localStorage.getItem("cart");

    if (cartJSON != null ) {
        var cart = JSON.parse(cartJSON);
        if(cart.length != 0) {
            cartBody.style.display = "flex";
            cartEmpty.style.display = "none";
            viewCart(cart);
        } else{
            var btnShoping = document.getElementById("shopping-now");
            btnShoping.addEventListener("click", () => {
                window.location.href = '/danhsach'
            })
            cartBody.style.display = "none";
            cartEmpty.style.display = "block";
        }
    } else{
        var btnShoping = document.getElementById("shopping-now");
        btnShoping.addEventListener("click", () => {
            window.location.href = '/danhsach'
        })
        cartBody.style.display = "none";
        cartEmpty.style.display = "block";
    }

});

function viewCart(cart) {
    var thanhTien = 0;
    cart.forEach(function (item) {
        // Tạo thẻ div cho mỗi sản phẩm
        var productDiv = document.createElement("div");
        productDiv.className = "product-cart-item";
        productDiv.id = item.ID;

        // Tạo thẻ img cho hình ảnh sản phẩm
        var imgElement = document.createElement("img");
        imgElement.className = "product-image";
        imgElement.src = item.Hinh;
        imgElement.alt = "Product Image";
        productDiv.appendChild(imgElement);

        // Tạo thẻ div cho chi tiết sản phẩm
        var detailsDiv = document.createElement("div");
        detailsDiv.className = "product-details";

        // Tạo thẻ h3 cho tên sản phẩm
        var h3Element = document.createElement("h3");
        h3Element.textContent = item.Ten; // Thay "TenSach" bằng tên trường chứa tên sách trong dữ liệu
        
        detailsDiv.appendChild(h3Element);

        // Tạo thẻ p cho giá sản phẩm
        var gia = item.Gia;
        var pElement = document.createElement("p");
        pElement.className = "product-price-cart";
        pElement.textContent = gia;
        
        detailsDiv.appendChild(pElement);

        // Thêm div chi tiết vào sản phẩm
        productDiv.appendChild(detailsDiv);

        // Tạo thẻ div cho số lượng sản phẩm
        var quantityDiv = document.createElement("div");
        quantityDiv.className = "quantity";

        // Tạo input cho số lượng
        var soLuong = item.SoLuong;
        var quantityInput = document.createElement("input");
        quantityInput.className = "product-info-quantity-input"
        quantityInput.type = "number";
        quantityInput.value = Number(soLuong);
        quantityInput.min = 1;
        quantityInput.max = Number(soLuong);
        quantityInput.id = Number(soLuong);
        quantityInput.addEventListener('input', function () {
            var bookId = productDiv.id;
            
            var newQuantity = Number(this.value);
            var max = Number(this.id);
            console.log(newQuantity);
            console.log(quantityInput.max);
            // if
            if(newQuantity >= 1 && newQuantity <= max) {
                updateQuantityInLocalStorage(bookId, newQuantity);
            } else if(newQuantity >= max) {
                alert("Hiện trong giỏ hàng chỉ có giảm số lượng sản phẩm");
                this.value = max;
            } else if(newQuantity <= 1) {
                this.value = 1;
            }
        });
        quantityDiv.appendChild(quantityInput);

        thanhTien = Number(thanhTien) + Number(convertCurrencyToNumber(gia)*soLuong);

        // Thêm div số lượng vào sản phẩm
        productDiv.appendChild(quantityDiv);

        // Tạo thẻ div cho tổng giá trị sản phẩm
        var totalDiv = document.createElement("div");
        totalDiv.className = "product-total";
        var tongTien = Number(convertCurrencyToNumber(gia)*soLuong);

        totalDiv.textContent = convertNumberToCurrency(tongTien); // Thay "Gia" bằng tên trường chứa giá trong dữ liệu
        productDiv.appendChild(totalDiv);

        // Tạo thẻ div cho nút xóa sản phẩm
        var removeDiv = document.createElement("button");
        removeDiv.className = "remove-btn";
        removeDiv.addEventListener('click', function () {
            // Lấy ID từ ID của thẻ sản phẩm
            var bookIdToRemove = productDiv.id;
        
            // Gọi hàm xóa sách từ giỏ hàng
            removeBookFromLocalStorage(bookIdToRemove);
        });
        removeDiv.innerHTML = '<i class="fa-solid fa-trash"></i>';
        productDiv.appendChild(removeDiv);

        // Thêm sản phẩm vào container
        var cartContainer = document.getElementById("cart-container");
        cartContainer.appendChild(productDiv);
    });

    var divThanhTien = document.getElementById("thanhTien");
    divThanhTien.innerText = convertNumberToCurrency(thanhTien);

    var divTotal = document.getElementById("total");
    divTotal.innerText = convertNumberToCurrency(thanhTien);
}

function convertCurrencyToNumber(currencyString) {
    // Xóa ký tự '₫' và dấu phẩy (nếu có)
    var cleanedString = currencyString.replace('₫', '').replace(/\./g, '');

    // Chuyển đổi thành số nguyên
    var convertedNumber = parseInt(cleanedString);

    return isNaN(convertedNumber) ? 0 : convertedNumber;
}


function convertNumberToCurrency(number) {
    // Định dạng số và thêm ký tự '₫'
    var formattedCurrency = number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return formattedCurrency;
}

function deleteAllCart() {
    localStorage.removeItem("cart");
    location.reload(true);
}

function removeBookFromLocalStorage(bookId) {
    // Lấy danh sách sách từ localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tìm vị trí của sách trong danh sách
    var indexToRemove = cart.findIndex(item => item.ID === bookId);

    // Nếu tìm thấy, xóa sách khỏi danh sách
    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);

        // Lưu danh sách mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(true);
    }
}

function updateQuantityInLocalStorage(bookId, newQuantity) {
    // Lấy danh sách sản phẩm từ localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tìm sản phẩm cần chỉnh sửa trong danh sách
    var productToUpdate = cart.find(item => item.ID === bookId);

    // Nếu sản phẩm được tìm thấy, cập nhật số lượng
    if (productToUpdate) {
        productToUpdate.SoLuong = newQuantity;

        // Lưu danh sách mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        // location.reload(true);
    }
}