const { default: mongoose } = require('mongoose')
mongoose.set('strictQuery', false)

const dbConnect = async () => {
    // 0: disconnected
    // 1: connected
    // 2: connecting
    // 3: disconnecting
    try {
        const connection = await mongoose.connect(`mongodb://localhost:27017/book_Store`)
        if (connection.connection.readyState === 1) {
            console.log("DB connection is successfully !")
        }
        else {
            console.log("DB connecting")
        }
    } catch (error) {
        console.log("Db connection is failed", error)
        throw new Error(error)
    }
}

module.exports = dbConnect