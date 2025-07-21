import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  _id: String,
  customerId: String,
  name: String,
  email: String,
  // just define fields you need
});

export default mongoose.model("Customer", customerSchema);
