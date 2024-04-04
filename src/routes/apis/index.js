const accountRouter = require('./account')
const bookRouter = require('./book')
const orderRouter = require('./order')
const orderDetailRouter = require('./orderDetail')

const initRoutes = (app) => {
    app.use('/api/account', accountRouter)
    app.use('/api/book', bookRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/order-detail', orderDetailRouter)
}

module.exports = {
    initRoutes
}