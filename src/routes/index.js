const taiKhoanRouter = require('./taikhoan')
const sachRouter = require('./sach')

const initRoutes = (app) => {
    app.use('/api/taikhoan', taiKhoanRouter)
    app.use('/api/sach', sachRouter)
}

module.exports = {
    initRoutes
}