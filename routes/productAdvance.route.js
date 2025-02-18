import express, { json } from "express";
import { Product } from "../models/Product.model.js";

const router = express.Router();

/**
 *  @description fetch by category
 *  @endpoint '/product/category/:category
 */
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const productByCategory = await Product.find({
      category: { $regex: new RegExp(category, "i") },
    });
    if (productByCategory.length === 0) {
      return res.json({
        message: "Product of this category is not available",
        success: false,
      });
    }
    res.json({
      amount: `Total number of items of this category found is : ${productByCategory.length}`,
      message: `List of products of category : ${category}`,
      success: true,
      productByCategory,
    });
  } catch (err) {
    res.json({ message: "Error fetching data", success: false });
  }
});

/**
 *  @description fetch by price-range
 *  @endpoint '/product/advanced/price-range?min=value&max=value
 */
router.get("/price-range", async (req, res) => {
  try {
    const minPrice = parseFloat(req.query.min);
    const maxPrice = parseFloat(req.query.max);

    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    if (products.length === 0) {
      return res.json({
        message: "No products found in this price range",
        success: false,
      });
    }

    res.json({
      message: `Products between ${minPrice} and ${maxPrice}`,
      success: true,
      products,
    });
  } catch (err) {
    res.json({ message: "Error fetching data", success: false });
  }
});

/**
 *  @description fetch by rating
 *  @endpoint '/product/advanced/rating/:rating'
 */
router.get("/rating/:rating", async (req, res) => {
  try {
    const { rating } = req.params;
    const product = await Product.find({
      rating: { $gte: parseFloat(rating) },
    });

    if (!product) {
      return res.json({ message: "Products not found", success: false });
    }

    res.json({
      message: `Total number of products with rating : ${rating} are ${product.length}`,
      success: true,
      product,
    });
  } catch (err) {
    res.json({ message: "error fetching data", success: false });
  }
});

/**
 *  @description fetch by name or description
 *  @endpoint '/product/advanced/search?name=value&desc=value'
 */
router.get("/search", async (req, res) => {
  try {
    const { name, desc } = req.query;

    let query = {};
    if (name) query.name = { $regex: new RegExp(name, "i") };
    if (desc) query.description = { $regex: new RegExp(desc, "i") };

    const product = await Product.find(query);
    if (product.length === 0) {
      return res.json({ message: "Product not found", success: false });
    }
    res.json({ message: "product found", success: true, product });
  } catch (err) {
    res.json({ message: "error fetching data", success: false });
  }
});

/**
 *  @description update product stock by id
 *  @endpoint '/product/advanced/update-stock/:productid'
 */
router.put("/update-stock/:productid", async (req, res) => {
  try {
    const { productid } = req.params;
    const { stock } = req.body;
    const prevStock = await Product.findOne({id : Number(productid)});
    const updatedStock = await Product.findOneAndUpdate(
      {
        id: Number(productid),
      },
      { stock: stock },
      { new: true }
    );
    if (updatedStock.stock !== Number(stock)) {
      return res.json({ message: "Stock updation failed", success: false });
    }
    res.json({
      message: "Stock updated successfully",
      previousStock: prevStock.stock,
      currentStock: updatedStock.stock,
      success: true,
    });
  } catch (err) {
    res.json({ message: "error updating data", err, success: false });
  }
});
export default router;
