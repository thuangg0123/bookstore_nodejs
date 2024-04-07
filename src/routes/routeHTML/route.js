const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'trangchu.html'));
});

router.get('/trangchu', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'trangchu.html'));
});

router.get('/danhsach', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'danhsach.html'));
});

router.get('/danhsach/sach/:bookID', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chitiet.html'));
});

router.get('/dangnhap', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

router.get('/dangky', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

router.get('/giohang', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'giohang.html'));
});

router.get('/giohang/thanhtoan', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'thanhtoan.html'));
});

router.get('/taikhoan/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user_taikhoan.html'));
});

router.get('/taikhoan/thongtin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user_taikhoan.html'));
});

router.get('/taikhoan/donhang', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user_donhang.html'));
});

router.get('/taikhoan/donhang/:orderID', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user_chitietdonhang.html'));
});

router.get('/quantri', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

router.get('/quantri/sanpham', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_product.html'));
});

router.get(`/quantri/sanpham/chitiet`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_detailproduct.html'));
});

// router.get(`/quantri/sanpham/${id}`, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'giohang.html'));
// });

router.get('/quantri/sanpham/them', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_addproduct.html'));
});

// router.get(`/quantri/sanpham/xoa/{id}`, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'giohang.html'));
// });

router.get(`/quantri/sanpham/chinhsua`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_editproduct.html'));
});

// router.get(`/quantri/sanpham/chinhsua/{id}`, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'giohang.html'));
// });

router.get('/quantri/taikhoan', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_account.html'));
});

router.get('/quantri/taikhoan/chinhsua', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_editaccount.html'));
});

// router.get(`/quantri/taikhoan/xoa/{id}`, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'giohang.html'));
// });

// router.get(`/quantri/taikhoan/chinhsua/{id}`, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'giohang.html'));
// });

router.get(`/quantri/donhang`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_order.html'));
});

router.get(`/quantri/donhang/chitiet`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_detailorder.html'));
});

// router.get(`/quantri/donhang/{id}`, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'admin_detailorder.html'));
// });

// router.get(`/quantri/donhang/capnhantrangthai`, (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'admin_detailorder.html'));
// });

module.exports = router;
