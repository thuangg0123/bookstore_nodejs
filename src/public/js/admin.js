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
    const clickedButton = event.currentTarget;
    document.getElementById("ID").value = clickedButton.id;
    const updateStatusModal = document.getElementById('updateStatusModal')
    updateStatusModal.style.display = 'block';
}

const closeUpdateStatusModal = () => {
    document.getElementById('updateStatusModal').style.display = 'none';
}

const updateOrderStatus = async () => {
    var orderStatus = document.getElementById("orderStatus").value;
    var orderID = document.getElementById("ID").value;

    const order = {
        orderStatus: orderStatus
    }

    const response = await apiRequest("PUT", `/order/${orderID}`, order);
    if (response.success) {
        window.location.reload();
    } else if (response === "500") {
        alert("Server hiện đang gặp lỗi, vui lòng thử lại sau");
    }
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