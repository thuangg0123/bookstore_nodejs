function checkCart()  {
    var cart = localStorage.getItem("cart");

    if (cart == null)   {
        var cart = new Array();
        let json = JSON.stringify(cart);
        localStorage.setItem("cart", json);
    }
}

function addToCart() {
    var isAdd = false;
    checkCart();
    var cartJSON = localStorage.getItem("cart");
    var cart = JSON.parse(cartJSON);

    var id = document.getElementById("ID").innerText;
    var soLuong = document.getElementById("quantityInput").value;
    var soTonKho = document.getElementById("quantityInput").max;

    for(i = 0; i < cart.length; i++) {
        if(cart[i].ID === id)  {
            var book = cart[i];
            book.SoLuong = Number(book.SoLuong) + Number(soLuong); 
            if(book.SoLuong >= soTonKho) {
                book.SoLuong = soTonKho;
                alert("Đã quá số lượng tồn kho");
            }
            cart[i] = book;
            isAdd = true;
            break;
        } else{
            continue;
        }

    }

    if(isAdd === false) {
        var ten = document.getElementById("Ten").innerText;
        var hinh = document.getElementById("Hinh").getAttribute("src");
        var gia = document.getElementById("Gia").innerText;
        
        var book = {
            "ID": id,
            "Ten": ten,
            "Hinh": hinh,
            "Gia": gia,
            "SoLuong": soLuong,
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