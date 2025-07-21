import Product from "../model/Product.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .select("productName _id productId  sellingPrice")
      .populate("category subCategory");
    res.status(200).json({ products });
    console.log(products);
  } catch (error) {
    next(error);
  }
};
