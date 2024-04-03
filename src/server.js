const express = require("express")
// var cors = require('cors')

const dbConnect = require("./config/dbConnect")
const { initRoutes } = require('./routes/index')

const app = express()
// app.use(cors({
//     origin: process.env.URL_CLIENT,
//     methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
//     credentials: true
// }))

const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log(`Sever is running on the http://localhost:${port}`)
})