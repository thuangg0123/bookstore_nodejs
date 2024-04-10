const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatDate = (originalDateTimeString) => {
    // Tách phần ngày giờ từ chuỗi ban đầu
    const parts = originalDateTimeString.split('T');
    const datePart = parts[0];
    const timePart = parts[1].split('.')[0];

    // Tách thành các thành phần ngày, tháng, năm, giờ, phút
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    // Định dạng lại chuỗi ngày giờ theo yêu cầu
    const formattedDateTimeString = `${day}-${month}-${year} ${hours}:${minutes}`;

    return formattedDateTimeString;
}