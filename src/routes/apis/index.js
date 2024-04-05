const accountRouter = require('./Account')
const bookRouter = require('./Book')
const orderRouter = require('./Order')
const orderDetailRouter = require('./OrderDetails')

const initRoutes = (app) => {
    app.use('/api/account', accountRouter)
    app.use('/api/book', bookRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/order-detail', orderDetailRouter)
}

module.exports = {
    initRoutes
}