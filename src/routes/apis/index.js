const taiKhoanRouter = require('./taikhoan')
const sachRouter = require('./sach')
const donhangRouter = require('./donhang')
const chitietdonhangRouter = require('./chitietdonhang')

const initRoutes = (app) => {
    app.use('/api/taikhoan', taiKhoanRouter)
    app.use('/api/sach', sachRouter)
    app.use('/api/don-hang', donhangRouter)
    app.use('/api/chi-tiet-don-hang', chitietdonhangRouter)
}

module.exports = {
    initRoutes
}