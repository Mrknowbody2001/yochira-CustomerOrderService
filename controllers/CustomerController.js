import Customer from "../model/Customer.js";

export const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().select("name _id customerId "); // Only return needed fields
    res.status(200).json({ customers });
    console.log(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

