import express from "express";
import { getAllCustomers } from "../controllers/CustomerController.js";

const CustomerRouter = express.Router();

CustomerRouter.get("/getAllCustomers", getAllCustomers); // GET /api/customers

export default CustomerRouter;
