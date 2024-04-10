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