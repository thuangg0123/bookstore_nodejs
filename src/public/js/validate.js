import { getCurrentAccount } from './AccountAPI.js';

async function checkPermission() {
    const response = await getCurrentAccount();
    if (response.success) {
        const accountData = response.data;
        if (!accountData.isAdmin) {
            alert("Bạn không có đủ quyền hạn để sử dụng");
            window.location.href = "/trangchu";
        }
    } else if (response === "401") {
        window.location.href = "/dangnhap";
    }
}
checkPermission();