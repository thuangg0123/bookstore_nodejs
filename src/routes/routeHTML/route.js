const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

router.get('/trangchu', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

router.get('/danhsach', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'product_list.html'));
});

router.get('/danhsach/sach/:bookID', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'product_details.html'));
});

router.get('/dangnhap', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

router.get('/dangxuat', (req, res) => {
    res.redirect('/trangchu');
});

router.get('/dangky', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

router.get('/giohang', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});

router.get('/giohang/thanhtoan', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'checkout.html'));
});

router.get('/taikhoan/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user_info.html'));
});

router.get('/taikhoan/thongtin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user_info.html'));
});

router.get('/taikhoan/donhang', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user_order.html'));
});

router.get('/taikhoan/donhang/:orderID', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user_order_details.html'));
});

router.get('/quantri', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

router.get('/quantri/sanpham', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_product.html'));
});

router.get('/quantri/sanpham/them', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_product_add.html'));
});

router.get("/quantri/sanpham/:bookID", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_product_details.html'));
});

router.get("/quantri/sanpham/chinhsua/:bookID", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_product_edit.html'));
});


router.get('/quantri/taikhoan', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_account.html'));
});

router.get('/quantri/taikhoan/chinhsua/:accountID', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_account_edit.html'));
});

router.get(`/quantri/donhang`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_order.html'));
});


router.get(`/quantri/donhang/:orderID`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_order_details.html'));
});

module.exports = router;
