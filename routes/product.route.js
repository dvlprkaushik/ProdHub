import express from "express";
import { Product } from "../models/Product.model.js";

const router = express.Router();

/**
 * @description get all products
 * @endpoint coolapi/product/all
 */
router.get("/all", async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (allProducts.length < 1) {
      return res.json({ message: "No products found", success: false });
    }
    res.json({
      message: "List of all products available",
      success: true,
      allProducts,
    });
  } catch (err) {
    res.json({ message: "Error fetching data", success: false });
  }
});

/**
 * @description get product by id
 * @endpoint coolapi/product/:productid
 */
router.get("/:productid", async (req, res) => {
  try {
    const { productid } = req.params;
    const foundProduct = await Product.findOne({ id: parseInt(productid) });
    if (!foundProduct) {
      return res.json({ message: "Product not found", success: false });
    }
    res.json({
      message: "Product found ",
      success: true,
      details: foundProduct,
    });
  } catch (err) {
    res.json({ message: "Error fetching details", err, success: false });
  }
});

/**
 * @description testing post request
 * @endpoint coolapi/product/testpost
 */
router.post("/add", async (req, res) => {
  try {
    const { id, name, category, price, stock, rating, description } = req.body;

    if (
      !id ||
      !name ||
      !category ||
      !price ||
      !stock ||
      !rating ||
      !description
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newProduct = new Product(req.body);
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", success: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

/**
 * @description update a product by id
 * @endpoint coolapi/product/:productid
 */
router.put("/:productid", async (req, res) => {
  try {
    const { productid } = req.params;
    const { name, category, price, stock, rating, description } = req.body;
    const product = await Product.findOneAndUpdate(
      { id: productid },
      {
        name,
        category,
        price,
        stock,
        rating,
        description,
      },
      { new: true }
    );
    if (!product) {
      return res.json({ message: "Product not found", success: false });
    }
    res.json({
      message: `product with id : ${productid} has been updated successfully`,
      success: true,
      updatedproduct: product,
    });
  } catch (err) {
    res.json({ message: "error updating product", success: false, err });
  }
});

/**
 * @description delete a product by id
 * @endpoint coolapi/product/:productid
 */
router.delete("/:productid", async (req, res) => {
  try {
    const { productid } = req.params;
    await Product.findOneAndDelete({ id: productid });
    const product = await Product.findOne({ id: productid });
    if (product) {
      return res.json({
        message: "unable to delete the product",
        success: false,
        product,
      });
    }
    res.json({
      message: `Product with id : ${productid} has been deleted successfully`,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "Unable to perform the dlete operation",
      success: false,
      err,
    });
  }
});
export default router;
