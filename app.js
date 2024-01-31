const express = require("express");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for error handling
app.use(errorHandler);

module.exports = app;
