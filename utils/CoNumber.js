import CustomerOrder from "../model/CustomerOrder.js";

const generateCONumber = async () => {
  const count = await CustomerOrder.countDocuments();
  const nextNumber = count + 1;
  return `CO${String(nextNumber).padStart(4, "0")}`; // e.g., CO-0001
};

export default generateCONumber;
