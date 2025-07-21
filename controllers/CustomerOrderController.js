import generateCONumber from "../utils/CoNumber.js";
import CustomerOrder from "../model/CustomerOrder.js";
import Customer from "../model/Customer.js";
import Product from "../model/Product.js";

export const createCustomerOrder = async (req, res, next) => {
  try {
    const { customerId, items, remark, paymentStatus } = req.body;

    //validate customer
    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Validate and enrich each product
    const enrichedItems = [];
    let orderTotalValue = 0;

    for (const item of items) {
      const product = await Product.findOne({
        productId: item.productId,
      }).populate("category subCategory");

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }

      const itemTotalValue = product.sellingPrice * item.orderQty;
      orderTotalValue += itemTotalValue;

      enrichedItems.push({
        productId: product.productId,
        productName: product.productName,
        barcode: product.productCode,
        category: product.category,
        subCategory: product.subCategory,
        orderQty: item.orderQty,
        sellingPrice: product.sellingPrice,
        itemTotalValue,

        status: item.status,
      });
    }

    const coNumber = await generateCONumber();

    const newOrder = new CustomerOrder({
      coNo: coNumber,
      customerId: customer.customerId,
      customerName: customer.name,
      items: enrichedItems, // ✅ array of products
      orderTotalValue,
      paymentStatus: paymentStatus || "Cash", // optional field
      remark,
      orderDate: new Date(),
    });

    await newOrder.save();

    res.status(201).json({
      message: "Customer order created successfully",
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

//new co number
export const getNextCustomerOrderNumber = async (req, res, next) => {
  try {
    const coNumber = await generateCONumber();
    res.status(200).json({ coNumber });
  } catch (error) {
    next(error);
  }
};

//get all CO list
export const getAllCustomerOrders = async (req, res, next) => {
  try {
    const customerOrders = await CustomerOrder.find();
    res.status(200).json({ customerOrders });
  } catch (error) {
    next(error);
  }
};

//get one CO
export const getOneCustomerOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await CustomerOrder.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

//delete CO

export const deleteCustomerOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedOrder = await CustomerOrder.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json({ message: "Order deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

//update CO

export const updateCustomerOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customerId, items, remark, paymentStatus } = req.body;

    //validate customer
    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let orderTotalValue = 0;
      let enrichedItems = [];

    // Validate and enrich each product
    for (const item of items) {
      const product = await Product.findOne({
        productId: item.productId,
      }).populate("category subCategory");

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }

      // Prepare totals and item list
      

      const itemTotalValue = product.sellingPrice * item.orderQty;
      orderTotalValue += itemTotalValue;

      enrichedItems.push({
        productId: product.productId,
        productName: product.productName,
        barcode: product.productCode,
        category: product.category,
        subCategory: product.subCategory,
        orderQty: item.orderQty,
        sellingPrice: product.sellingPrice,
        itemTotalValue,
        status: item.status,
      });
    }

    // Update order
    const updatedOrder = await CustomerOrder.findByIdAndUpdate(
      id,
      {
        customerId: customer.customerId,
        customerName: customer.name,
        items: enrichedItems,
        orderTotalValue,
        paymentStatus: paymentStatus || "Cash",
        remark,
        orderDate: new Date(), // optional: update timestamp
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Customer order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
