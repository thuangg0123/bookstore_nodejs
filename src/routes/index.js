const taiKhoanRouter = require('./taikhoan')

const initRoutes = (app) => {
    app.use('/api/taikhoan', taiKhoanRouter)
}

module.exports = {
    initRoutes
}