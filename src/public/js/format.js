const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatDate = (originalDate) => {
    const date = new Date(originalDate);

    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = padZero(date.getUTCHours());
    const minutes = padZero(date.getUTCMinutes());

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate;

    // Hàm để thêm số 0 vào trước số nếu cần
    function padZero(number) {
        return number < 10 ? `0${number}` : number;
    }
}