const taiKhoanRouter = require('./taikhoan')
const sachRouter = require('./sach')
const donhangRouter = require('./donhang')

const initRoutes = (app) => {
    app.use('/api/taikhoan', taiKhoanRouter)
    app.use('/api/sach', sachRouter)
    app.use('/api/don-hang', donhangRouter)
}

module.exports = {
    initRoutes
}