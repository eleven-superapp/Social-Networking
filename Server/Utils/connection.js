const { default: mongoose } = require("mongoose");

mongo = process.env.MONGO_DB_CONNECTION_STRING;
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(() => {
  console.log("Social Netowrking connected to MongoDB", mongo);
});

module.exports = { mongoose };
