import { addBook } from './api/BookAPI.js';
import { formatNumber, validateImageFile } from './CheckProduct.js';

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
        priceInput.addEventListener("input", formatNumber);
    }

    const imageInput = document.getElementById("image");
    if (imageInput) {
        imageInput.addEventListener("change", validateImageFile);
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

    const formData = new FormData();
    formData.append("image", bookImage);
    formData.append("name", bookName);
    formData.append("price", bookPrice);
    formData.append("author", bookAuthor);
    formData.append("publisher", bookPublisher);
    formData.append("weight", bookWeight);
    formData.append("size", bookSize);
    formData.append("stock", bookStock);
    formData.append("introduction", bookIntroduction);

    try {
        const response = await addBook(formData);
        console.log(response)

        if (response.success) {
            const bookID = response.dataProduct.bookID;
            const _id = response.dataProduct._id;
            const image = bookImage;

            //code upload hình ảnh ở đây

            // window.location.href = `/quantri/sanpham/${bookID}`;
        } else if (response === "500") {
            alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Server error");
    }
}
