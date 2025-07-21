import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";
import CoRouter from "./Routes/CoRoutes.js";
import CustomerRouter from "./Routes/CustomerRoute.js";
import ProductRouter from "./Routes/ProductRoute.js";

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

//! error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

dotenv.config();

app.use("/api/Customer-Order", CoRouter);
app.use("/api/Customers", CustomerRouter);
app.use("/api/Products", ProductRouter);

//! Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

//! start server

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
