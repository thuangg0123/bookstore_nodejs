import { addBook, uploadImage } from './api/BookAPI.js';
import { formatNumberInput } from './Formatter.js';
import { validateImageFile, loadImagePreview } from './ImageProcessor.js';

document.addEventListener("DOMContentLoaded", function () {
    const cancelBtn = document.getElementById("cancel-button")
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            history.back();
        })
    }

    const addBtn = document.querySelector(".add-button");
    if (addBtn) {
        addBtn.addEventListener("click", addBookEvent);
    }

    const priceInput = document.getElementById("price");
    if (priceInput) {
        priceInput.addEventListener("input", () => formatNumberInput(priceInput));
    }

    const imageInput = document.getElementById("image");
    if (imageInput) {
        imageInput.addEventListener("change", validateImageFile);
        imageInput.addEventListener("change", loadImagePreview);
    }
});

async function addBookEvent() {
    const bookImage = document.getElementById("image").files[0];
    const bookName = document.getElementById("name").value;
    const bookPriceString = document.getElementById("price").value;
    const bookPrice = bookPriceString.replace(" ", "");
    const bookAuthor = document.getElementById("author").value;
    const bookPublisher = document.getElementById("publisher").value;
    const bookWeight = document.getElementById("weight").value;
    const bookSize = document.getElementById("size").value;
    const bookStock = document.getElementById("stock").value;
    const bookIntroduction = document.getElementById("introduction").value;

    const book = {
        bookName: bookName,
        bookPrice: bookPrice,
        bookAuthor: bookAuthor,
        bookPublisher: bookPublisher,
        bookWeight: bookWeight,
        bookSize: bookSize,
        bookStock: bookStock,
        bookIntroduction: bookIntroduction,
    };

    try {
        const response = await addBook(book);
        if (response.success) {
            const _id = response.dataProduct._id;
            const bookID = response.dataProduct.bookID

            const formData = new FormData();
            formData.append('images', bookImage);

            const uploadResponse = await uploadImage(_id, formData);
            if (uploadResponse.success) {
                window.location.href = `/quantri/sanpham/${bookID}`;
            } else {
                alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
            }
        } else if (response === "500") {
            alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Server error");
    }
}