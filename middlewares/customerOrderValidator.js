import { body, validationResult } from "express-validator";

const validateCustomerOrder = [
  body("coNo").notEmpty().withMessage("Co number  is required"),
  body("customerId").notEmpty().withMessage("Customer ID is required"),
  body("productId").notEmpty().withMessage("Product ID is required"),
  body("orderQty")
    .notEmpty()
    .isNumeric()
    .withMessage("Order quantity is required"),
  //   body("sellingPrice")
  //     .notEmpty()
  //     .isNumeric()
  //     .withMessage("Selling price is required"),
  //   body("productName").notEmpty().withMessage("Product name is required"),
  //   body("supplierType").notEmpty().withMessage("Supplier type is required"),
  // Optional fields (like description) not validated strictly
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateCustomerOrder;
