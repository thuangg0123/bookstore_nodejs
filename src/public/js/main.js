document.addEventListener("DOMContentLoaded", async () => {
    const userOptionsSection = document.getElementById("userOptionsSection");
    const adminSection = document.getElementById("adminSection");
    const accountSection = document.getElementById("accountSection");
    userOptionsSection.style.display = "none";
    adminSection.style.display = "none";
    accountSection.style.display = "none";

    const response = await apiRequest("GET", "/account/check");
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
    
    logout();
});

function logout() {
    const btnLogout = document.getElementById("btnLogout");
    btnLogout.addEventListener('click', async () => {
        const response = await apiRequest("POST", "/account/logout");
        if(response.success) {
            alert("Đăng xuất thành công");
        } else{
            alert("Server hiện đang có vấn đề, vui lòng thử lại sau");
        }
    })
}