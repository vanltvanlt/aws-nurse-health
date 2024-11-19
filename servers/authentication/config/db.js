const mongoose = require("mongoose");

const mongoUri = "mongodb://localhost:27017/auth-service-db";
mongoose.connect(mongoUri, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
