import express from "express";
import {
  approvedCustomerOrder,
  createCustomerOrder,
  deleteCustomerOrder,
  getAllCustomerOrders,
  getNextCustomerOrderNumber,
  getOneCustomerOrder,
  updateCustomerOrder,
} from "../controllers/CustomerOrderController.js";

const CoRouter = express.Router();

// creating a CO
CoRouter.post("/create", createCustomerOrder);

//  next CO number
CoRouter.get("/new-co-number", getNextCustomerOrderNumber);

//get all CO list
CoRouter.get("/co-list", getAllCustomerOrders);

//get one CO
CoRouter.get("/:id", getOneCustomerOrder);

//delete CO
CoRouter.delete("/delete/:id", deleteCustomerOrder);

//update CO
CoRouter.put("/update/:id", updateCustomerOrder);

//approved order
CoRouter.put("/approve/:id", approvedCustomerOrder);

export default CoRouter;
