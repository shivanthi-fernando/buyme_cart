const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cartRoute = require("./routes/cart");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
)
.then(() => console.log("DB Connection is successful"))
.catch((err) => {
    console.log(err);
});

app.use("/", cartRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend server");
});