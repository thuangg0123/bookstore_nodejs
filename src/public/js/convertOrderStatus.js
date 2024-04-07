const convertOrderStatus = (orderStatus) => {
    switch (orderStatus) {
        case 0:
            return "Chưa xác nhận";
        case 1:
            return "Đã xác nhận";
        case 2:
            return "Đang vận chuyển";
        case 3:
            return "Đã hoàn thành";
        default:
            return "Đã hủy";
    }
}
