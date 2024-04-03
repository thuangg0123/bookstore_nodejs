var isMenuOpen = false;

const toggleSidebar = () => {
    var sidebar = document.getElementById('sidebar');
    var content = document.querySelector('.content');

    var computedStyle = window.getComputedStyle(sidebar);
    var sidebarLeft = computedStyle.getPropertyValue('left');

    if (sidebarLeft === '-250px') {
        sidebar.style.left = '0';
        content.style.marginLeft = '250px';
    } else {
        sidebar.style.left = '-250px';
        content.style.marginLeft = '0';
    }
}

const closeSidebar = () => {
    var sidebar = document.getElementById('sidebar');
    var content = document.querySelector('.content');

    sidebar.style.left = '-250px';
    content.style.marginLeft = '0';
}

const goToAdminHome = () => {
    window.location.href = "/quantri";
}

const closeOrderDetailModal = () => {
    document.getElementById('orderDetailModal').style.display = 'none';
    document.getElementById("ID").value = "";
}

const openUpdateStatusModal = (event) => {
    var clickedButton = event.currentTarget;
    document.getElementById("ID").value = clickedButton.id;
    var updateStatusModal = document.getElementById('updateStatusModal')
    updateStatusModal.style.display = 'block';
    // updateStatusModal.acction = "/quantri/donhang/capnhantrangthai/" + clickedButton.id
    console.log(document.getElementById("ID").value)
}

const closeUpdateStatusModal = () => {
    document.getElementById('updateStatusModal').style.display = 'none';
}

const saveOrderStatus = () => {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy giá trị được chọn từ dropdown
    var orderStatus = document.getElementById("orderStatus").value;

    // Lấy giá trị từ input ID
    var orderID = document.getElementById("ID").value;

    // Gửi dữ liệu đến server bằng Fetch API
    fetch('/your-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderID: orderID, orderStatus: orderStatus })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dữ liệu đã gửi thành công:', data);
        // Thực hiện các thao tác cần thiết sau khi gửi thành công
    })
    .catch(error => {
        console.error('Lỗi khi gửi dữ liệu:', error);
    });

    closeUpdateStatusModal();
}

const btnDeleteProduct = () => {
    var confirmDelete = confirm('Bạn có chắc chắn muốn xóa không?');

    if (confirmDelete) {
        window.history.go(-1);
        alert('Sản phẩm đã được xóa.');
    }
}

const btnDeleteAccount = () => {

    var confirmDelete = confirm('Bạn có chắc chắn muốn xóa tài khoản này không?');

    if (confirmDelete) {
        window.location.href = 'admin.html'
        alert('Tài khoản đã được xóa.');
    }
}