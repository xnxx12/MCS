const mongoose = require("mongoose");
require('dotenv').config();
const DB = `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@aushadhi-aikyam.olipfgx.mongodb.net/MCS`;
mongoose.set("strictQuery", true);
mongoose
    .connect(DB)
    .then(() => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log(err);
    });

