const { Server } = require('socket.io')
const { createServer } = require('http')
const app = require('../../index.js')

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})