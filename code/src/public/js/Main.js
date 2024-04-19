import { getCurrentAccount, logout } from './api/AccountAPI.js';
import { searchBooks } from './api/BookAPI.js';

document.addEventListener("DOMContentLoaded", async () => {
    const userOptionsSection = document.getElementById("userOptionsSection");
    const adminSection = document.getElementById("adminSection");
    const accountSection = document.getElementById("accountSection");
    userOptionsSection.style.display = "none";
    adminSection.style.display = "none";
    accountSection.style.display = "none";

    const response = await getCurrentAccount();
    if (response.success) {
        const account = response.data;
        if (account.isAdmin) {
            adminSection.style.display = "block";
        } else {
            accountSection.style.display = "block";
        }
    } else {
        userOptionsSection.style.display = "block";
    }

    setEventLogout();
});

function setEventLogout() {
    const btnLogout = document.getElementById("btnLogout");
    const btnLogoutAdmin = document.getElementById("btnLogoutAdmin");

    if (btnLogout) { btnLogout.addEventListener('click', () => logoutEvent()) };
    if (btnLogoutAdmin) { btnLogoutAdmin.addEventListener('click', () => logoutEvent()) };

    const logoutEvent = async () => {
        const response = await logout();
        if (response.success) {
            alert("Đăng xuất thành công");
        } else {
            alert("Server hiện đang có vấn đề, vui lòng thử lại sau");
        }
    }
}

const searchResult = document.getElementById("searchResult");
const bgOverlay = document.getElementById("bg-overlay")
searchResult.style.display = "none";

let timeId;
async function handleSearchBooks() {
    const query = document.getElementById("searchInput").value.trim()
    if (!query) {
        displaySearchResult([]);
        return
    }
    clearTimeout(timeId)
    timeId = setTimeout(async () => {
        try {
            const response = await searchBooks(query);
            displaySearchResult(response)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, 1000);
}

function displaySearchResult(products) {
    bgOverlay.addEventListener("click", function () {
        searchResult.style.display = "none";
        bgOverlay.style.display = "none";
    });
    if (products.length === 0) {
        searchResult.style.display = "none";
        bgOverlay.style.display = "none"
    } else {
        searchResult.style.display = "block";
        bgOverlay.style.display = "block"
        searchResult.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement("div");
            productItem.className = "seach-item";
            productItem.innerHTML = `
                <a href="/danhsach/sach/${product.bookID}">
                    <div class="product-search-img">
                        <img src="${product.bookImage}" alt="${product.bookName}">
                    </div>
                    <h3 class="product-search-name">${product.bookName}</h3>
                </a> 
            `;
            searchResult.appendChild(productItem);
        });
    }
}

window.handleSearchBooks = handleSearchBooks;