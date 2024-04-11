document.addEventListener("DOMContentLoaded", () => {
    var quantityInput = document.getElementById('quantityInput');
    var btnMinus = document.getElementById('btn-minus-quantity');
    var btnPlus = document.getElementById('btn-plus-quantity');

    if (btnMinus) {
        btnMinus.addEventListener('click', () => {
            updateQuantity(-1);
        });
    }

    if (btnPlus) {
        btnPlus.addEventListener('click', () => {
            updateQuantity(1);
        });
    }

    if (quantityInput) {
        quantityInput.addEventListener('input', () => {
            var maxQuantity = Number(quantityInput.getAttribute("max"));

            var input = parseInt(quantityInput.value, 10);
            if (input >= 1 && input <= maxQuantity) {
                quantityInput.value = input;
            } else if (input <= 0 || isNaN(input)) {
                quantityInput.value = 1;
            } else if (input >= maxQuantity) {
                quantityInput.value = maxQuantity;
                alert("Đã đạt số lượng tối đa");
            }
        });
    }

    function updateQuantity(change) {
        var maxQuantity = Number(quantityInput.getAttribute("max"));

        var currentValue = parseInt(quantityInput.value, 10);
        var newValue = currentValue + change;

        if (newValue >= 1 && newValue <= maxQuantity) {
            quantityInput.value = newValue;
        } else if (newValue <= 0 || isNaN(newValue)) {
            quantityInput.value = 1;
        } else if (newValue >= maxQuantity) {
            quantityInput.value = maxQuantity;
            alert("Đã đạt số lượng tối đa");
        }
    }
});

function checkCart() {
    var cart = localStorage.getItem("cart");

    if (cart == null) {
        var cart = new Array();
        let json = JSON.stringify(cart);
        localStorage.setItem("cart", json);
    }
}

function addToCart() {
    let isAdd = false;
    checkCart();
    const cartJSON = localStorage.getItem("cart");
    let cart = JSON.parse(cartJSON);

    const bookID = document.getElementById("productID").innerText;
    const quantity = document.getElementById("quantityInput").value;
    const bookStock = document.getElementById("quantityInput").max;

    for (i = 0; i < cart.length; i++) {
        if (cart[i].ID === bookID) {
            var book = cart[i];
            book.SoLuong = Number(book.SoLuong) + Number(quantity);
            if (book.SoLuong >= bookStock) {
                book.SoLuong = bookStock;
                alert("Đã vượt số lượng tối đa");
            }
            cart[i] = book;
            isAdd = true;
            break;
        } else {
            continue;
        }

    }

    if (isAdd === false) {
        const book = {
            "bookID": bookID,
            "quantity": quantity,
        }

        cart[cart.length] = book;
        isAdd = true;
    }

    if (isAdd) {
        alert("Thêm vào giỏ hàng thành công")
    }

    let json = JSON.stringify(cart);
    localStorage.setItem("cart", json);
}