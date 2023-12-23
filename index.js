const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Seeder = require("./src/classes/seeder");
const router = require("../server/src/routes");

Seeder.wilaya();
Seeder.commune();
Seeder.superAdmin();

const cors = require("cors");
const apiKeyMiddleware = require("./middleware/apiKey");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Use the middleware for all routes
app.use("/api", router);

mongoose.connect("mongodb://127.0.0.1:27017/wedelivery");

app.listen(process.env.PORT, () => {
  console.log("Server is listening ", process.env.PORT);
});
