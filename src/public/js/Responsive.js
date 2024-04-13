document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.fa-bars');
    const menuItems = document.querySelector('.menu-items');
    const overlay = document.querySelector('.overlay');

    function closeMenu() {
        menuItems.classList.remove('active');
        overlay.classList.remove('active');
    }

    menuIcon.addEventListener('click', function () {
        menuItems.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function () {
        closeMenu();
    });
});