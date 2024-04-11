const validateImageFile = () => {
    var input = document.getElementById('image');
    var errorMessage = document.getElementById('error-message');

    if (input.files.length > 0) {
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        var fileName = input.files[0].name;

        if (!allowedExtensions.exec(fileName)) {
            errorMessage.innerHTML = 'Chỉ chấp nhận các file ảnh có định dạng JPG, JPEG, PNG, hoặc GIF.';
            input.value = '';
        } else {
            errorMessage.innerHTML = '';
        }
    }
}
const formatNumber = (input) => {
    let inputValue = input.value;

    // Loại bỏ tất cả các ký tự không phải số
    inputValue = inputValue.replace(/[^0-9]/g, '');

    // Thêm dấu cách hàng triệu
    if (inputValue.length > 3) {
        inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    input.value = inputValue;
}

export {validateImageFile, formatNumber};