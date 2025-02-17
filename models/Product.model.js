import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Clothing",
        "Home Appliances",
        "Books",
        "Toys",
        "Sports",
        "Beauty",
      ],
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Prevents negative prices
    },
    stock: {
      type: Number,
      required: true,
      min: 0, // Prevents negative stock
    },
    rating: {
      type: Number,
      required: true,
      min: 1.0,
      max: 5.0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
); 

export const Product = mongoose.model("Product", productSchema);
