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
});

