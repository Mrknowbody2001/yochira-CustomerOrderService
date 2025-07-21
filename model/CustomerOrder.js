import mongoose from "mongoose";

const customerOrderSchema = new mongoose.Schema(
  {
    coNo: { type: String, required: true, unique: true },

    customerId: {
      type: String,
      ref: "Customer",
      required: true,
    },
    customerName: { type: String },

    items: [
      {
        productId: {
          type: String, // manual string ID (not ObjectId)
          required: true,
        },
        productName: { type: String },
        barcode: { type: String },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        subCategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubCategory",
        },
        orderQty: { type: Number, required: true },
        sellingPrice: { type: Number },
        itemTotalValue: { type: Number }, // ✅ renamed from totalValue
      },
    ],

    orderTotalValue: { type: Number, required: true }, // ✅ renamed for clarity

    paymentStatus: {
      type: String,
      enum: ["Cash", "Card", "Cheque"],
      default: "Cash",
    },
    remark: { type: String },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("CustomerOrder", customerOrderSchema);
