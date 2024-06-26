const accountRouter = require('./AccountAPI')
const bookRouter = require('./BookAPI')
const orderRouter = require('./OrderAPI')
const orderDetailRouter = require('./OrderDetailsAPI')

const initRoutes = (app) => {
    app.use('/api/account', accountRouter)
    app.use('/api/book', bookRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/order-detail', orderDetailRouter)
}

module.exports = {
    initRoutes
}