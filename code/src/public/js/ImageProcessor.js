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

function loadImagePreview(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var imgElement = document.createElement('img');
        imgElement.src = event.target.result;
        document.getElementById('imagePreview').innerHTML = '';
        document.getElementById('imagePreview').appendChild(imgElement);
    };

    reader.readAsDataURL(file);
}

export { validateImageFile, loadImagePreview };