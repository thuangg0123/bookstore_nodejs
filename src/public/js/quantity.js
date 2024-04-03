document.addEventListener("DOMContentLoaded", () => {
    var quantityInput = document.getElementById('quantityInput');
    var maxQuantity = parseInt(document.getElementById("quantityInput").getAttribute("max"), 10);
    var btnMinus = document.getElementById('btn-minus-quantity');
    var btnPlus = document.getElementById('btn-plus-quantity');
    
    if (btnMinus) {
        btnMinus.addEventListener('click', () => {
            console.log("click");
            updateQuantity(-1);
        });
    }

    if (btnPlus) {
        btnPlus.addEventListener('click', () => {
            console.log("click");
            updateQuantity(1);
        });
    }

    if (quantityInput){
        quantityInput.addEventListener('input', () => {
            console.log("change");
            var input = parseInt(quantityInput.value, 10);
            console.log(input);
            if (input >= 1 && input <= maxQuantity) {
                quantityInput.value = input;
            } else if(input <= 0 || isNaN(input)){
                quantityInput.value = 1;
            } else if(input >= maxQuantity){
                quantityInput.value = maxQuantity;
                alert("Đã quá số lượng tồn kho");
            }
        });
    }
    
    function updateQuantity(change) {
        var currentValue = parseInt(quantityInput.value, 10);
        var newValue = currentValue + change;

        if (newValue >= 1 && newValue <= maxQuantity) {
            quantityInput.value = newValue;
        } else if(newValue <= 0 || isNaN(newValue)){
            quantityInput.value = 1;
        } else if(newValue >= maxQuantity){
            quantityInput.value = maxQuantity;
            alert("Đã quá số lượng tồn kho");
        }
    }
});