const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(() => {
    console.log("Social Netowrking connected to MongoDB");
})

module.exports = { mongoose }