function checkCart()  {
    var cart = localStorage.getItem("cart");

    if (cart == null)   {
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

    for(i = 0; i < cart.length; i++) {
        if(cart[i].ID === bookID)  {
            var book = cart[i];
            book.SoLuong = Number(book.SoLuong) + Number(quantity); 
            if(book.SoLuong >= bookStock) {
                book.SoLuong = bookStock;
                alert("Đã vượt số lượng tối đa");
            }
            cart[i] = book;
            isAdd = true;
            break;
        } else{
            continue;
        }

    }

    if(isAdd === false) {
        const book = {
            "bookID": bookID,
            "quantity": quantity,
        }
    
        cart[cart.length] = book;
        isAdd = true;
    }

    if(isAdd) {
        alert("Thêm vào giỏ hàng thành công")
    }
    
    let json = JSON.stringify(cart);
    localStorage.setItem("cart", json);
}