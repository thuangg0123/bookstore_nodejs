document.addEventListener("DOMContentLoaded", function () {
    var cartEmpty = document.getElementById("container-cart-empty");
    var cartBody = document.getElementById("cart-body");
    var cartJSON = localStorage.getItem("cart");

    if (cartJSON != null) {
        var cart = JSON.parse(cartJSON);
        checkItem(cart);
    }
});

function checkItem(cart) {
    var thanhTien = 0;
    var container = document.getElementById("checkout-product");
    console.log(container)
    cart.forEach(async function (cartItem) {
        const response = await apiRequest("GET", `/book/${cartItem.bookID}`);
        const bookData = response.data;

        var giaInt = bookData.bookPrice;
        var soLuong = Number(cartItem.quantity);
        var totalNumber = Number(giaInt) * Number(soLuong);
        thanhTien = Number(thanhTien) + Number(totalNumber);

        // Create table element
        var table = document.createElement('table');
        table.className = 'checkout-product-item';
        table.id = bookData.bookID;

        // Create table row element
        var row = document.createElement('tr');

        // Create table cell for image
        var imgCell = document.createElement('td');
        imgCell.className = 'checkout-product-item-img';
        var img = document.createElement('img');
        img.src = bookData.bookImage;
        img.alt = '';
        imgCell.appendChild(img);
        row.appendChild(imgCell);

        // Create table cell for product detail
        var detailCell = document.createElement('td');
        detailCell.className = 'checkout-product-item-detail';
        var productName = document.createElement('div');
        productName.className = 'checkout-product-item-name';
        productName.textContent = bookData.bookName;
        detailCell.appendChild(productName);
        row.appendChild(detailCell);

        // Create table cell for product price
        var priceCell = document.createElement('td');
        priceCell.className = 'checkout-product-item-price';
        priceCell.textContent = convertNumberToCurrency(giaInt);
        row.appendChild(priceCell);

        // Create table cell for product quantity
        var qtyCell = document.createElement('td');
        qtyCell.className = 'checkout-product-item-qty';
        var qtySpan = document.createElement('span');
        qtySpan.textContent = soLuong;
        qtyCell.appendChild(qtySpan);
        row.appendChild(qtyCell);

        // Create table cell for total price
        var totalCell = document.createElement('td');
        totalCell.className = 'checkout-product-item-total';
        totalCell.textContent = convertNumberToCurrency(totalNumber);
        row.appendChild(totalCell);

        // Add the row to the table
        table.appendChild(row);

        console.log(table);
        container.appendChild(table);

        totalPrice(thanhTien)
    });
}

function totalPrice(thanhTien) {
    var divThanhTien = document.getElementById("divThanhTien");
    var divTotal = document.getElementById("divTotal");
    divThanhTien.innerText = convertNumberToCurrency(thanhTien);
    divTotal.innerText = convertNumberToCurrency(thanhTien + 25000);
}

function convertCurrencyToNumber(currencyString) {
    // Xóa ký tự '₫' và dấu phẩy (nếu có)
    var cleanedString = currencyString.replace('₫', '').replace('.', '');

    // Chuyển đổi thành số nguyên
    var convertedNumber = parseInt(cleanedString);
    return convertedNumber;
}

function convertNumberToCurrency(number) {
    // Định dạng số và thêm ký tự '₫'
    var formattedCurrency = number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return formattedCurrency;
}